// import { createServer } from "http";
import { parse } from "url";
import { join } from "path";
import * as next from "next";
import * as express from 'express';

const serviceLocator = require('./config/di');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  const server = express()

  server.get('/api/search', (req: Object, res: Object, next: Object) => {
    serviceLocator.get("movieController").SearchMovieService(req, res, next);
  });
  
  server.get('/api/clear', (req: Object, res: Object, next: Object) => {
    serviceLocator.get("cacheController").ClearCache(req, res, next);
  });
  
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

