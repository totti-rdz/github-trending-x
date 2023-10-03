import express from "express";
import path from "path";
import dotenv from "dotenv";
import { routes } from "./routes";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const pathClient = path.join(__dirname, "..", "dist", "client");
const pathClientIndex = path.join(pathClient, "index.html");

app.use(express.static(pathClient));

// Set endpoints for express router routes
app.use("/api", routes());

app.get("*", (_, res) => {
  res.sendFile(pathClientIndex);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
