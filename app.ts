import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';

import { apiRoutes } from './src/routes';

// enable .env config file
dotenv.config();

// Express session
const app: express.Application = express();
app.set('port', process.env.PORT || 8081);
app.use(express.static('static'));

// Packages config
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        resave: true,
        secret: 'EXPRESS-X-SESSION',
        saveUninitialized: false
    })
);
app.use('/api', apiRoutes);

app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404);
    res.json(err);
});

app.listen(app.get('port'), () => {
    console.log(
        `IMDB Watchlist API Server Listening on port: ${app.get('port')}`
    );
});
