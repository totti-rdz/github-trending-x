import { Request, Response } from 'express';
import Scraper from '../services/scraper';
import { QueryParamsHelper } from '../utils/QueryParamsHelper';

export class RepoController {
  public static async getRepos(req: Request, res: Response) {
    const language = req.params.language || '';

    const queryParams = QueryParamsHelper.getQueryStringFromUrl(req.url);

    const scraper = await new Scraper(undefined, language, queryParams).init();
    const result = await scraper.getRepos();
    if (result.length === 0) res.status(204);
    res.send(result);
  }
  public static async getLanguages(_: Request, res: Response) {
    const scraper = await new Scraper().init();
    const result = await scraper.getLanguages();
    res.send(result);
  }

  public static async getDevelopers(req: Request, res: Response) {
    const language = req.params.language || '';
    const scraper = await new Scraper('developers', language).init();
    const result = await scraper.getDevelopers();
    res.send(result);
  }
}
