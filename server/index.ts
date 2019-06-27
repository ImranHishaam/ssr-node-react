// import { createServer } from "http";
import { parse } from "url";
import { join } from "path";
import * as next from "next";
import * as express from 'express';

import * as MovieController from './api/controllers/movie.controller';
import * as CacheController from './api/controllers/cache.controller';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dir: './client', dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  const server = express();

  server.get('/api/search', MovieController.searchMovie);
  
  server.get('/api/clear', CacheController.clearCache);
  
  server.get('*', (req: any, res: any) => {

    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    if (pathname === "/service-worker.js") {
      const filePath = join(__dirname, "..", pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  })
    
  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`);
  })
});
