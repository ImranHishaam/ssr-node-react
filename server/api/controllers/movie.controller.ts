import * as MovieService from '../services/movie.service';

const NodeCache = require( "node-cache" );
const appCache = new NodeCache();

export const searchMovie = (req: any, res: any, next: any) => {
  const pageNumber: number = parseInt(req.query.page);
  const queryString: string = req.query.searchString;
  
  res.set('Cache-Control', 'public, max-age=30');
  
  appCache.get(`${queryString}${pageNumber}`, (err: any, value: any) => {
    if (!err) {
      if (value == undefined) {
        MovieService.searchMovieApi(req, res, next);
      } else {
        res.status(200).send({ "success": true, "data": value });
      }
    }
  });
};





