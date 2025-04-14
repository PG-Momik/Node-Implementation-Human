import {IWebzPost} from "./IWebzPost";

/**
 *  Interface representing the response structure from the Webz.io News API Lite : https://api.webz.io/newsApiLite
 */
export interface IWebzPostResponse {
    posts: IWebzPost[];
    totalResults: number;
    moreResultsAvailable: number;
    next: string;
    requestsLeft: number;
    warnings: any;
}