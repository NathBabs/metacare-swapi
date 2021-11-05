import * as express from 'express';
const router = express.Router();

import { comment } from '../controllers/CommentController.js';

router.route('/film/comment/:filmId').post(comment);


export default router;