#!/usr/bin/env node

import "reflect-metadata";
import { container } from "tsyringe";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { WebzPostApiService } from "../services/webzPostApi.service";
import logger from "../utils/logger";

const argv = yargs(hideBin(process.argv))
    .option('q', {
        type: 'string',
        demandOption: true,
        describe: 'Search query',
    })
    .help()
    .argv;

(async () => {
    try {
        const queryParams = { ...argv };

        console.log('queryParams');
        console.log(queryParams);

        const webzPostApiService = container.resolve(WebzPostApiService);

        await webzPostApiService.fetchPosts(queryParams, (retrieved: number, remaining: number) => {
            logger.info(`Progress: ${retrieved} fetched, ${remaining} remaining`);
        });
    } catch (err) {
        logger.error('Error fetching posts:', err);

        process.exit(1);
    }
})();
