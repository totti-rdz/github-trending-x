import { Request, Response } from 'express';
import Scraper from '../services/scraper';

export class RepoController {
  public static async getRepos(_: Request, res: Response) {
    const result = await Scraper.getRepos();
    res.send(result);
  }
}
