import express from "express";
import Scraper from "../services/scraper";

const router = express.Router();

router.get("/repos", async (_, res) => {
  const scraper = new Scraper();
  const result = await scraper.getRepos();
  res.send(result);
});

export default router;
