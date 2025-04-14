import {IWebzPost} from "./IWebzPost";

/**
 * Utility class to convert post data from the `IWebzPost` interface to the internal `Post'.
 *
 * Makes sure that all properties for upsert exists.
 */
export class WebzPost {
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
    highlight_text?: string;
    highlight_thread_title?: string;
    highlight_title?: string;
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

    constructor(data: IWebzPost) {
        this.uuid = data.uuid;
        this.url = data.url;
        this.ord_in_thread = data.ord_in_thread;
        this.parent_url = data.parent_url;
        this.author = data.author;
        this.title = data.title;
        this.text = data.text;
        this.language = data.language;
        this.sentiment = data.sentiment;
        this.rating = data.rating;
        this.highlight_text = data.highlightText;
        this.highlight_thread_title = data.highlightThreadTitle;
        this.highlight_title = data.highlightTitle;
        this.published = data.published;
        this.crawled = data.crawled;
        this.updated = data.updated;
        this.webz_reporter = data.webz_reporter;
        this.ai_allow = data.ai_allow;
        this.has_canonical = data.has_canonical;
        this.breaking = data.breaking;
        this.thread = data.thread;
        this.social = data.social;
        this.categories = data.categories;
        this.topics = data.topics;
        this.external_links = data.external_links;
        this.external_images = data.external_images;
        this.trust = data.trust;
        this.syndication = data.syndication;
    }
}