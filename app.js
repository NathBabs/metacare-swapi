//require('dotenv').config()
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
//const express = require('express');
//const helmet = require('helmet');
import helmet from 'helmet';
//const logger = require('morgan');
import logger from 'morgan';
import router from './routes/index.js'
//const routes = require('./routes');
const app = express();

app.use(helmet())
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/', router);



export default app;