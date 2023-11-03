import express from 'express';
import { RepoController } from '../controllers/trendingRepos';

const router = express.Router();

router.get('/trending-repositories/', RepoController.getRepos);
router.get('/trending-repositories/:language', RepoController.getRepos);
router.get('/programming-languages', RepoController.getLanguages);
router.get('/trending-developers', RepoController.getDevelopers);

export default router;
