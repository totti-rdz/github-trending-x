import express from 'express';

import trendingReposRouter from './trendingRepos';

const router = express.Router();

export const routes = () => {
  // add api routes here in correct order

  router.use(trendingReposRouter);

  router.get('/health', (_, res) => {
    res.status(200).send("ok");
  });

  router.get('*', (_, res) => {
    res.status(404).send();
  });

  return router;
};
