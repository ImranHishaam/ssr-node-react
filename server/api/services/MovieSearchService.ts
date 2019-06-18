'use strict';

class MovieSearchService {

    axios: any;
    _ : any;
    config: any;
    appCache: any;

    constructor(axios: any, _: any, config: any, appCache: any) {
        this.axios = axios;
        this._ = _;
        this.config = config;
        this.appCache = appCache;
    }

    SearchMovie = async (req: any, res: any, next: any) => {
        const pageNumber: number = parseInt(req.query.page);
        const queryString: string = req.query.searchString;
        const urlPromises = [];

        this._.times(2, (index:number) => {
            urlPromises.push(this.axios.get(`${this.config.app.API_URL}/?apikey=${this.config.app.API_KEY}&s=${queryString}&page=${pageNumber+index}`))
        })

        try {
            const apiResponse: [any] = await this.axios.all(urlPromises);
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
                res.status(400).send({"success": !isError, "message": "Movie not found"});
            } else {
                this.appCache.set(`${queryString}${pageNumber}`, dataSet);
                res.status(200).send({"success": !isError, "data": dataSet});
            }  
        } catch (error) {
            res.status(400).send({"success": false, "error": error});
        }
    }
}

module.exports = MovieSearchService;
