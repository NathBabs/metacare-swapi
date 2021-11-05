import * as express from 'express';
const router = express.Router();

import { listFilms, listSingleFilm } from '../controllers/MovieController.js';


router.route('/films/list').get(listFilms);

// list a film
router.route('/film/list/:filmId').get(listSingleFilm);


export default router;