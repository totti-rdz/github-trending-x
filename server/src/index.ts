import express from "express";
import path from "path";
import dotenv from "dotenv";
import { routes } from "./routes";
import { appendQueryParams } from "./utils/appendQueryParams";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const pathClient = path.join(__dirname, "..", "dist", "client");
const pathClientIndex = path.join(pathClient, "index.html");

// Set endpoints for express router routes
app.use("/api", routes());

app.get("*", (req, res, next) => {
  if (process.env.NODE_ENV === "development") {
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
  console.log(`Example app listening on port ${port}`);
});
