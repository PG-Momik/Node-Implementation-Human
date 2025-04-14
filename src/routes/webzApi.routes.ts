import { Router } from 'express';
import { container } from 'tsyringe';
import { WebzApiController } from "../controllers/webzApi.controller";

const router = Router();
const webzApiController = container.resolve(WebzApiController);

router.get('/fetch-webz-posts', webzApiController.fetchPosts);

export default router;
