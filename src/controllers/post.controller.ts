import { Request, Response } from 'express';
import {autoInjectable, inject} from 'tsyringe';
import { PostService } from '../services/post.service';

@autoInjectable()
export class PostController {
    constructor(
        private postService: PostService
    ) {}

    getPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const filters = this.getFilters(req.query);
            const perPage = Number(req.query.per_page) || 20;

            const posts = await this.postService!.getPaginatedPosts(filters, perPage);

            res.status(200).json({ success: true, data: posts });
        } catch (error: any) {
            res.status(500).json({ success: false, errors: error.message });
        }
    };

    private getFilters(queryParams: any) {
        const { q, author, language, sentiment, ai_allow, webz_reporter, published, crawled } = queryParams;

        return { q, author, language, sentiment, ai_allow, webz_reporter, published, crawled };
    }

}
