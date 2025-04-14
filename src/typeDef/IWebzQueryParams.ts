
/**
 * Interface representing the query parameters accepted by the Webz.io API.
 * Used to construct search queries for fetching posts.
 *
 * TODO: Add more query param per doc.
 */
export interface IWebzQueryParams {
    q: string;
    sort: string;
    order: string;
    sentiment: string;
    highlight: string;
    size: string;
}