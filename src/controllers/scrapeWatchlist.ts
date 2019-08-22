import { response } from 'express';

const request = require('request');
const JustWatch = require('justwatch-api');

export const scrapeWatchlist = async (req: any, response: any) => {
    request(
        'https://www.imdb.com/user/' +
            req.query.userId +
            '/watchlist?view=detail',
        async (err: any, res: any, text: any) => {
            const initialStateRegex = /IMDbReactInitialState\.push\((\{.+\})\);/g;
            const matches: any = initialStateRegex.exec(text);
            const initialStateText = matches[1];
            const watchlistData = JSON.parse(initialStateText);
            const movieIds = watchlistData.list.items.map((i: any) => i.const);
            request(
                {
                    url: `http://www.imdb.com/title/data?ids=${movieIds.join(
                        ','
                    )}`,
                    headers: {
                        'Accept-Language': 'en'
                    }
                },
                async (err: any, res: any, json: any) => {
                    response.json(JSON.parse(json));
                }
            );
        }
    );
};

export const getMovieOffers = async (req: any, response: any) => {
    const jw = new JustWatch();
    const jwData = await jw.search({
        query: req.query.title
    });
    response.json(jwData.items[0].offers);
};

export const getProviders = async (req: any, res: any) => {
    const jw = new JustWatch();
    const providers = await jw.getProviders();
    res.json(providers);
};
