import { Router } from 'express';
import { container } from 'tsyringe';
import { PostController } from '../controllers/post.controller';

const router = Router();
const postController = container.resolve(PostController);

router.get('/posts', postController.getPosts);

export default router;
