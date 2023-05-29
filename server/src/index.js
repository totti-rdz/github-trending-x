import express from "express";
import Scraper from "./services/scraper.js";

const port = 3000;

const app = express();

app.get("/", async (_, res) => {
  const scraper = new Scraper();
  const result = await scraper.getRepos();
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
