import * as express from 'express';
const router = express.Router();

import { filterCharacters, listMovieCharacters } from '../controllers/CharacterController.js';

// endpoint to filter characters by name, gender or height
router.route('/character/list').get(filterCharacters);

// endpoint to get all character names in a movie
router.route('/character/:filmId').get(listMovieCharacters);

export default router;