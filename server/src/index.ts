import express from "express";
import path from "path";
import dotenv from "dotenv";
import { routes } from "./routes";
import { appendQueryParams } from "./utils/appendQueryParams";

dotenv.config();
const environment = process.env.NODE_ENV;

const port = process.env.PORT || 3000;
const app = express();

const pathClient = path.join(__dirname, "..", "dist", "client");
const pathClientIndex = path.join(pathClient, "index.html");

// Set endpoints for express router routes
app.use("/api", routes());

app.get("*", (req, res, next) => {
  if (environment === "development") {
    res.redirect(
      "http://localhost:5173" + req.path + appendQueryParams(req.query)
    );
    return;
  }
  next();
});

app.use(express.static(pathClient));
app.get("*", (_, res) => {
  res.sendFile(pathClientIndex);
});

app.listen(port, () => {
  if (environment !== "production") {
    console.info(
      "\x1b[33m%s\x1b[0m", // change font color to yellow
      `NODE_ENV is set to "${environment}". It is recommended to set it to "production" when running in production mode.`,
      "\x1b[0m" // reset font color
    );
  }
  console.log(`Example app listening on port ${port}`);
});
