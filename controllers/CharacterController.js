//@ts-check
const url = process.env.BASE_URL;
import { cmToFtIn } from '../helpers/cmToFtIn.js';
import axios from 'axios';
import _ from 'lodash';
import log from '../helpers/logger.js'
import fetchData from '../helpers/fetchData.js';
//import { PrismaClient } from '@prisma/client'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export async function filterCharacters(req, res, next) {
    try {
        let peopleUrl = `${url}/people`
        const characters = await fetchData(peopleUrl);

        // build sort/filter object
        // name, gender, height 
        const filter = {
            // @ts-ignore
            ...((req.query.name) && { name: decodeURIComponent(req.query.name) }),
            ...((req.query.gender) && { gender: req.query.gender }),
            ...((req.query.height) && { height: req.query.height })
        }

        const filteredCharacters = _.filter(characters, filter);

        // calculate metadata for only height
        let totalHeight;
        if (filter.height) {
            totalHeight = filteredCharacters.reduce((acc, { height }) => {
                return parseInt(acc) + parseInt(height)
            }, 0);
        }

        // calulate the amount of female and male that match these criteria
        const maleCount = _.countBy(filteredCharacters, x => x.gender == 'male').true;
        const femaleCount = _.countBy(filteredCharacters, x => x.gender == 'female').true;

        //select distinct skin colors and add to an array
        // @ts-ignore
        const skin_color = _.uniqBy(_.map(filteredCharacters, 'skin_color'));

        //select distinct eye colors and add to an array
        // @ts-ignore
        const eye_color = _.uniqBy(_.map(filteredCharacters, 'eye_color'));


        return res.status(200).send({
            success: true,
            data: {
                message: `There are ${filteredCharacters.length} characters with this search criteria, ${maleCount ? maleCount : 0} Male(s) have these and ${femaleCount ? femaleCount : 0}  Female(s)`,
                filteredCharacters,
                totalHeightCm: `${totalHeight ? totalHeight : null}cm`,
                totalHeightFtIn: `${totalHeight ? cmToFtIn(totalHeight) : null}`,
                skin_colors: skin_color,
                eye_colors: eye_color
            }
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}


/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
export async function listMovieCharacters(req, res, next) {
    try {
        const filmId = +req.params.filmId

        const { data } = await axios.get(`${url}/films/${filmId}`);

        const characters = data.characters;
        const movieName = data.title;

        let charactersNames = [];

        for (let index = 0; index < characters.length; index++) {
            const peopleUrl = characters[index];
            const response = await axios.get(peopleUrl);
            const { name } = response.data;
            charactersNames.push(name);
        }

        return res.status(200).send({
            success: true,
            message: `These are the characters that featured in ${movieName}`,
            charactersNames: charactersNames
        });


    } catch (error) {
        log.error(error);
        return res.status(500).send(error);
    }
}