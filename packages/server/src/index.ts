import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { routes } from './routes';
import { QueryParamsHelper } from './utils/QueryParamsHelper';
import { logger } from './services/logger';

dotenv.config();
const environment = process.env.NODE_ENV;

const port = process.env.PORT || 3000;
const app = express();

// Set endpoints for express router routes
app.use('/api', routes());

// Redirecting routes to Vite development server in development
app.get('*', (req, res, next) => {
  if (environment === 'development') {
    res.redirect(
      'http://localhost:5173' +
        req.path +
        QueryParamsHelper.appendQueryObject(req.query)
    );
    return;
  }
  next();
});

// Serving react frontend pages
const pathClient = path.join(__dirname, '..', 'dist', 'client');
const pathClientIndex = path.join(pathClient, 'index.html');
app.use(express.static(pathClient)); // serving css and js files along html files
app.get('*', (_, res) => {
  res.sendFile(pathClientIndex);
});

app.listen(port, () => {
  if (environment !== 'production') {
    logger.info(
      `NODE_ENV is set to "${environment}". It is recommended to set it to "production" when running in production mode.`
    );
    return;
  }
  console.log(`Example app listening on port ${port}`);
});
