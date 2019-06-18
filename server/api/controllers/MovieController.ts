'use strict';

class MovieController {

    movieSearchService: any;
    appCache: any;

    constructor(movieSearchService: any, appCache: any) {
        this.movieSearchService = movieSearchService;
        this.appCache = appCache;
    }

    SearchMovieService = (req: any, res: any, next: any) => {

        const pageNumber: number = parseInt(req.query.page);
        const queryString: string = req.query.searchString;

        this.appCache.get(`${queryString}${pageNumber}` , ( err: any, value: any ) => {
            var that=this;
            if( !err ){
              if(value == undefined){
                that.movieSearchService.SearchMovie(req, res, next);
              }else{
                res.status(200).send({"success": true, "data": value});
              }
            }
          });
    }
}

module.exports = MovieController;






