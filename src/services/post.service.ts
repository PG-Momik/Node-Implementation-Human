import { injectable } from 'tsyringe';
import { Post } from '../entities/Post';
import {AppDataSource} from "../config/database";
import {WebzPost} from "../typeDef/WebzPost";
import logger from "../utils/logger";

@injectable()
export class PostService {

    /**
     * Write a batch of posts to the database (upsert operation).
     *
     * TODO: I should probably format uuid. They are not in actual uuid format.
     *
     * @param writeBatch Array of posts to write
     */
    async writeToDb(writeBatch: Record<string, WebzPost>): Promise<void> {
        try {
            const postRepository = AppDataSource.getRepository(Post);
            const upsertData     = Object.values(writeBatch);
            const affectedColumn = Object.keys(upsertData[0]);

            await postRepository
                .createQueryBuilder()
                .insert()
                .values(upsertData)
                .orUpdate({
                    conflict_target: ['uuid'],
                    overwrite: affectedColumn
                })
                .execute();

            logger.info("Batch write complete.");
        } catch (e) {
            logger.error('Error during upsert operation', e);

            throw e;
        }
    }

    /**
     * Get paginated posts with filters
     *
     * @param filters Filters to apply
     * @param perPage Number of posts per page
     */
    async getPaginatedPosts(filters: any, perPage: number) {
        const query = AppDataSource.getRepository(Post).createQueryBuilder('post');

        this.applyFilters(query, filters);

        query.take(perPage);

        return await query.getMany();
    }

    /**
     * Apply various filters to the query.
     *
     * @param query The query builder instance
     * @param filters Filters to apply
     */
    private applyFilters(query: any, filters: any): void {
        if (filters.q) {
            query.andWhere('post.title ILIKE :q', { q: `%${filters.q}%` });
        }

        if (filters.author) {
            query.andWhere('post.author ILIKE :author', { author: `%${filters.author}%` });
        }

        if (filters.language) {
            query.andWhere('post.language = :language', { language: filters.language });
        }

        if (filters.sentiment) {
            query.andWhere('post.sentiment = :sentiment', { sentiment: filters.sentiment });
        }

        if (filters.ai_allow !== undefined) {
            query.andWhere('post.ai_allow = :ai_allow', { ai_allow: Boolean(filters.ai_allow) });
        }

        if (filters.webz_reporter !== undefined) {
            query.andWhere('post.webz_reporter = :webz_reporter', { webz_reporter: Boolean(filters.webz_reporter) });
        }

        if (filters.published) {
            query.andWhere('post.published = :published', { published: filters.published });
        }

        if (filters.crawled) {
            query.andWhere('post.crawled = :crawled', { crawled: filters.crawled });
        }
    }
}

