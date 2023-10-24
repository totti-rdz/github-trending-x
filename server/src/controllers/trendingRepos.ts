import { Request, Response } from 'express';
import Scraper from '../services/scraper';

export class RepoController {
  public static async getRepos(req: Request, res: Response) {
    const language = req.params.language || '';
    const scraper = await new Scraper(language).init();
    const result = await scraper.getRepos();
    res.send(result);
  }
  public static async getLanguages(_: Request, res: Response) {
    const scraper = await new Scraper().init();
    const result = await scraper.getLanguages();
    res.send(result);
  }
}
