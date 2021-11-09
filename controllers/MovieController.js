//@ts-check
const url = process.env.BASE_URL;
import axios from 'axios';
//import { PrismaClient } from '@prisma/client'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

/**
 * // get all films and their comments
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export async function listFilms(req, res, next) {
    try {
        const { data } = await axios.get(`${url}/films`);
        // retrieve comments for each film from the database
        /* const comments = await prisma.comment.findMany({
            where: {
                id: {
                    in: data
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (comments.length == 0) {
            return res.status(404).send({
                success: false,
                message: 'There are no comments'
            })
        } */

        return res.status(201).send({
            sucess: true,
            data: {
                data
            }
        });
        // map each film with it's comments
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
export async function listSingleFilm(req, res, next) {
    try {
        // get the film id from params
        const id = +req.params.filmId

        //get the film from external API
        const { data } = await axios.get(`${url}/films/${id}`);

        // if film exists, then get comments with tied with film id from the database
        const comments = await prisma.comment.findMany({
            where: {
                movie: id
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                comment: true,
                movie: true,
                ip: true,
                createdAt: true
            }
        });

        console.log(comments);

        if (comments.length == 0) {
            return res.status(404).send({
                success: false,
                message: 'There are no comments'
            })
        }

        return res.status(201).send({
            sucess: true,
            data: {
                title: data.title,
                episode_id: data.episode_id,
                opening_crawl: data.opening_crawl,
                release_date: data.release_date,
                noOfComments: comments.length,
                comments
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
}