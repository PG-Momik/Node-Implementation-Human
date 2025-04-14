/**
 *  Interface representing the Post object structure that comes in the response from the Webz.io News API Lite : https://api.webz.io/newsApiLite
 */
export interface IWebzPost {
    uuid?: string;
    url?: string;
    ord_in_thread?: number;
    parent_url?: string;
    author?: string;
    title?: string;
    text?: string;
    language?: string;
    sentiment?: string;
    rating?: number;
    highlightText?: string;
    highlightThreadTitle?: string;
    highlightTitle?: string;
    published?: string;
    crawled?: string;
    updated?: string;
    webz_reporter?: boolean;
    ai_allow?: boolean;
    has_canonical?: boolean;
    breaking?: boolean;
    thread?: object;
    social?: object;
    categories?: object;
    topics?: object;
    external_links?: object;
    external_images?: object;
    trust?: object;
    syndication?: object;
}