import 'reflect-metadata';
import { Request, Response } from 'express';
import {injectable} from 'tsyringe';
import {WebzPostApiService} from "../services/webzPostApi.service";
import logger from "../utils/logger";

@injectable()
export class WebzApiController {
    constructor(
        private readonly webzPostApiService: WebzPostApiService
    ) {}

    public fetchPosts = async (req: Request, res: Response) => {
        const queryParams = req.query;

        if(queryParams.q == '' || queryParams.q == undefined){
            logger.error("Failed to fetch posts. Query param 'q' is required.");

            return res.status(400).json({
                message: "Failed to fetch posts.",
                error: "Query param 'q' is required.",
            });
        }

        try {
            await this.webzPostApiService.fetchPosts(queryParams, (fetched, remaining) => {
                logger.info(`Progress - Fetched: ${fetched}, Remaining: ${remaining}`);
            });

            return res.status(200).json({
                message: 'Fetch job completed successfully.',
            });
        } catch (error) {
            logger.error('Fetch job failed:', error);

            return res.status(500).json({
                message: 'Failed to fetch posts.',
                error: error instanceof Error ? error.message : String(error),
            });
        }
    };
}

