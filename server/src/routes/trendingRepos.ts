import express from 'express';
import { RepoController } from '../controllers/trendingRepos';

const router = express.Router();

router.get('/programming-languages', RepoController.getLanguages);

router.get('/trending-developers', RepoController.getDevelopers);
router.get('/trending-developers/:language', RepoController.getDevelopers);

router.get('/trending-repositories/', RepoController.getRepos);
router.get('/trending-repositories/:language', RepoController.getRepos);

export default router;
