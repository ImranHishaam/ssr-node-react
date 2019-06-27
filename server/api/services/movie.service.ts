import * as dotenv from 'dotenv';
import * as _ from 'lodash';
import axios from 'axios';

const NodeCache = require( "node-cache" );

const appCache = new NodeCache();

dotenv.config();

export const searchMovieApi = async (req: any, res: any, next: any) => {
    
    const pageNumber: number = parseInt(req.query.page);
    const queryString: string = req.query.searchString;
    const urlPromises = [];

    _.times(2, (index: number) => {
        urlPromises.push(axios.get(`${process.env.API_URL}/?apikey=${process.env.API_KEY}&s=${queryString}&page=${pageNumber + index}`))
    });

    try {
        const apiResponse: any[any] = await axios.all(urlPromises);
        const dataSet = [];
        let isError = false;
        apiResponse.some((response: any) => {
            if (response.data.Error !== undefined) {
                isError = true;
                return true;
            } else {
                dataSet.push(...response.data.Search);
            }
        });

        if (isError) {
            res.status(400).send({ success: !isError, error: {message: "Movie not found"} });
        } else {
            appCache.set(`${queryString}${pageNumber}`, dataSet);
            res.set('Cache-Control', 'public, max-age=30');
            res.status(200).send({ success: !isError, data: dataSet });
        }
    } catch (error) {
        res.status(400).send({ success: false, error: error });
    }
}
