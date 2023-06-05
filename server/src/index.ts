import express from "express";
import Scraper from "./services/scraper";
import path from "path";

const port = process.env.PORT || 3000;
const app = express();

// const __dirname = path.resolve();
const pathClient = path.join(__dirname, "..", "dist", "client");
const pathClientIndex = path.join(pathClient, "index.html");

app.use(express.static(pathClient));

app.get("/api/repos", async (_, res) => {
  const scraper = new Scraper();
  const result = await scraper.getRepos();
  res.send(result);
});

app.get("*", (_, res) => {
  res.sendFile(pathClientIndex);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
