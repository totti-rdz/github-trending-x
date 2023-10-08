import { Request, Response } from 'express';
import Scraper from '../services/scraper';

export class RepoController {
  public static async getRepos(_: Request, res: Response) {
    const scraper = new Scraper();
    const result = await scraper.getRepos();
    res.send(result);
  }
}
