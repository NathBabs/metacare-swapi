//@ts-check
const url = process.env.BASE_URL;
import axios from 'axios';
import requestIp from 'request-ip';
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
export const comment = async (req, res, next) => {
    try {
        if (req.body.comment.length > 500) {
            return res.status(400).send("Comment should be less than 500 characters");
        }
        const filmId = +req.params.filmId

        // make a request to see if that film exists
        // if it doesn't then, the API returns a 404 which axios will throw
        const { data } = await axios.get(`${url}/films/${filmId}`);
        console.log(data);

        // gt client ip address
        const ip = requestIp.getClientIp(req);
        console.log(ip);

        const comment = await prisma.comment.create({
            data: {
                comment: req.body.comment,
                ip: ip,
                movie: filmId
            }
        });
        console.log(comment);

        if (!comment) {
            return res.status(400).send({
                success: false,
                message: "Could not create comment"
            })
        }

        return res.status(200).send({
            success: true,
            data: {
                ...comment
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};