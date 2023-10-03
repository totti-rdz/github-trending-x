import express from "express";

import trendingReposRouter from "./trendingRepos";

const router = express.Router();

export const routes = () => {
  // add api routes here in correct order
  router.use(trendingReposRouter);
  return router;
};
