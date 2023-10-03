import express from "express";
import path from "path";
import { routes } from "./routes";

const port = 3000;
const app = express();

// const __dirname = path.resolve();
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
