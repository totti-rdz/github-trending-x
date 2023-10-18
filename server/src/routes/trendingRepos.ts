import express from 'express';
import { RepoController } from '../controllers/trendingRepos';

const router = express.Router();

router.get('/trending-repositories/:language', RepoController.getRepos);
router.get('/programming-languages', RepoController.getLanguages);

export default router;
