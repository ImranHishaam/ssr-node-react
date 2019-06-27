'use strict';

const NodeCache = require( "node-cache" );
const appCache = new NodeCache();

export const clearCache = (req: any, res: any, next: any) => {
    appCache.flushAll();
    res.status(200).send({ "success": true });
}
