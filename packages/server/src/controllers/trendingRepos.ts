import { Request, Response } from 'express';
import Scraper from '../services/scraper';
import { QueryParamsHelper } from '../utils/QueryParamsHelper';

import { isEven } from '@github-trending-x/shared';

export class RepoController {
  public static async getRepos(req: Request, res: Response) {
    const language = req.params.language || '';

    const queryString = QueryParamsHelper.getQueryStringFromUrl(req.url);
    const queryParams = new URLSearchParams(queryString);
    if (queryParams.has('spoken-language')) {
      const spokenLanguageCode = queryParams.get('spoken-language');
      queryParams.append('spoken_language_code', spokenLanguageCode || '');
      queryParams.delete('spoken-language');
    }

    const scraper = await new Scraper(
      undefined,
      language,
      queryParams.toString()
    ).init();
    const result = await scraper.getRepos();
    if (result.length === 0) res.status(204);
    res.send(result);
  }
  public static async getLanguages(_: Request, res: Response) {
    console.log('#########');
    console.log('TEST');
    console.log(isEven('hello world'));
    console.log(isEven(30));
    console.log('#########');
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

  public static async getSpokenLanguages(_: Request, res: Response) {
    const scraper = await new Scraper().init();
    const result = await scraper.getSpokenLanguages();
    res.send(result);
  }
}
