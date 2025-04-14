/**
 * Utility class for constructing query URLs to interact with the Webz.io News API.
 */
export class WebzQueryBuilder {
    private params: Record<string, string> = {};

    constructor(private baseUrl: string, private token: string) {
        this.params['token'] = token;
    }

    /**
     * No need to empty check 'query' since param 'q' is a mandatory field, we need when calling the API.
     *
     * @param query
     */
    setQuery(query: string): this {
        this.params['q'] = query.trim();

        return this;
    }

    setSort(sortBy: string): this {
        if (sortBy) {
            this.params['sort'] = sortBy.trim();
        }

        return this;
    }

    setOrder(orderBy: string): this {
        if (orderBy) {
            this.params['order'] = orderBy.trim();
        }

        return this;
    }

    setSentiment(sentiment: string): this {
        if (sentiment) {
            this.params['sentiment'] = sentiment.trim();
        }

        return this;
    }

    setHighlight(highlight: string): this {
        if (highlight) {
            this.params['highlight'] = highlight.trim();
        }

        return this;
    }

    setSize(size: string): this {
        if (size) {
            this.params['size'] = size.trim();
        }

        return this;
    }

    build(): string {
        const queryString = new URLSearchParams(this.params).toString();

        return `${this.baseUrl}?${queryString}`;
    }
}
