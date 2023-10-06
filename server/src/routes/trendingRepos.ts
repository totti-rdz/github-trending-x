import express from "express";
import { RepoController } from "../controllers/trendingRepos";

const router = express.Router();

router.get("/repos", RepoController.getRepos);

export default router;
