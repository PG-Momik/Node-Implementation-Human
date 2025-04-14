import {IWebzPost} from "../typeDef/IWebzPost";
import {IWebzPostResponse} from "../typeDef/IWebzPostResponse";
import {PostService} from "./post.service";
import axios from "axios";
import {injectable} from "tsyringe";
import {WebzQueryBuilder} from "../builders/WebzQueryBuilder";
import {IWebzQueryParams} from "../typeDef/IWebzQueryParams";
import {WebzPost} from "../typeDef/WebzPost";
import logger from "../utils/logger";


@injectable()
export class WebzPostApiService {
    private readonly baseUrl: string = 'https://api.webz.io/newsApiLite';
    private readonly token: string = process.env.WEBZ_API_TOKEN || '';
    private readonly writeBatchSize: number = 200;

    constructor(
        private  readonly postService: PostService
    ) {}

    /**
     * Fetches posts from : https://api.webz.io/newsApiLite
     *
     * Things to note:
     *  1. API only allows results per response
     *  2. We hold N results in memory before writing. (N =  this.writeBatchSize)
     *  3. We write N results to Posts table.
     *  4. Continue making api calls until all available records are fetched and written.
     *
     *  TODO 1: Look into why 'from'=x doesnt change in api
     *  TODO 2: Look into why 'moreResultsAvailable' doesnt change decrease in api response in each subsequent request.
     *  TODO 3: Implement 'moreResultsAvailable' in the while loop.
     *  TODO 4: Look into why 'uuid' values are not unique in N results.
     *  TODO 4: Look into why sleep(1000) is crashing my app. The api docs say 1 req per second. So i added it just in case by the app crashes.
     *
     * @param queryParams
     * @param callback
     */
    public async fetchPosts(queryParams: Record<string, any>, callback?: (fetched: number, remaining: number) => void): Promise<void> {
        const validQueryParams = this.sanitizeQueryParams(queryParams);
        const url              = this.buildRequestUrl(validQueryParams);

        let totalPostsRetrieved = -1;
        let totalPostsAvailable = 0;
        let nextUrl             = url;

        let writeBatch: Record<string, WebzPost> = {};

        try {
            logger.info("-------FETCH STARTED---------");

            while (this.shouldContinueFetching(totalPostsAvailable, totalPostsRetrieved)) {
                if(totalPostsRetrieved === -1){
                    totalPostsRetrieved = 0;
                }

                const response         = await axios.get(nextUrl);

                if (response?.status && response.status < 200) {
                    return this.handleFailCase(response);
                }

                const webzPostResponse = response.data as IWebzPostResponse;

                if (webzPostResponse.posts.length === 0) {
                    break;
                }

                totalPostsAvailable = webzPostResponse.totalResults;

                for (const post of webzPostResponse.posts) {
                    if (this.shouldWriteToDb(writeBatch)) {
                        await this.postService.writeToDb(writeBatch);

                        writeBatch = {};

                        logger.info(`Wrote ${Object.keys(writeBatch).length} posts to the database.`);
                    }

                    if (post.uuid) {
                        writeBatch[post.uuid] = new WebzPost(post);
                    }

                    totalPostsRetrieved++;
                }

                nextUrl = this.prepareNextUrl(webzPostResponse);

                if (callback) {
                    const remaining = Math.max(totalPostsAvailable - totalPostsRetrieved, 0);
                    callback(totalPostsRetrieved, remaining);
                }
            }

            // this.sleep(1000);
            logger.info("-------FETCH COMPLETED---------");
        } catch (error) {
            logger.error("Error fetching posts", error);
        }
    }

    private sanitizeQueryParams(queryParams: Record<string, any>): IWebzQueryParams {
        return {
            q: queryParams?.q?.trim() || '',
            sort: queryParams?.sort?.trim() || 'relevance',
            order: queryParams?.order?.trim() || 'desc',
            sentiment: queryParams?.sentiment?.trim() || 'negative',
            highlight: queryParams?.highlight?.trim() || 'true',
            size: String(queryParams?.size)?.trim() || '10'
        };
    }

    private buildRequestUrl(queryParams: IWebzQueryParams): string {
        const queryBuilder = new WebzQueryBuilder(this.baseUrl, this.token);
        queryBuilder
            .setQuery(queryParams.q)
            .setSort(queryParams.sort)
            .setOrder(queryParams.order)
            .setSentiment(queryParams.sentiment)
            .setHighlight(queryParams.highlight)
            .setSize(queryParams.size);

        return queryBuilder.build();
    }

    private shouldContinueFetching(totalPostsAvailable: number, totalPostsRetrieved: number): boolean {
        return totalPostsAvailable > totalPostsRetrieved;
    }

    private shouldWriteToDb(writeBatch: Record<string, IWebzPost>): boolean {
        return Object.keys(writeBatch).length >= this.writeBatchSize;
    }

    private prepareNextUrl(webzPostResponse: IWebzPostResponse): string {
        return this.baseUrl + webzPostResponse.next.replace('/newsApiLite', '');
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private handleFailCase(response: any) {
        throw new Error(`API request failed with status: ${response.status}`);
    }
}
