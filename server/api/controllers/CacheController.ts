'use strict';

class CacheController {

    appCache: any;

    constructor(appCache: any) {
        this.appCache = appCache;
    }

    ClearCache = (req: any, res: any, next: any) => {
        this.appCache.flushAll();
        res.status(200).send({"success": true});
    }
}

module.exports = CacheController;






