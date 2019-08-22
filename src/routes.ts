import Router from 'express';
import {
    scrapeWatchlist,
    getMovieOffers,
    getProviders
} from './controllers/scrapeWatchlist';

export const apiRoutes = Router();

apiRoutes.get('/scrape/watchlist', scrapeWatchlist);

apiRoutes.get('/movie/offers', getMovieOffers);

apiRoutes.get('/providers', getProviders);
