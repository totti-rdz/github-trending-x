import { AnyNode, Cheerio, CheerioAPI, load } from 'cheerio';
import scrapeUrl from '../utils/scrapeUrl';
import { logger } from './logger';
import { deduplicateArrayOfObjects } from '../utils/deduplicateArrayOfObjects';

const baseUrl = 'https://github.com';

const pathDefault = 'trending';
const languageDefault = 'javascript';
const queryParamDefault = '?since=daily'; //&spoken_language_code=en';

const selectors = {
  container: 'article.Box-row',
  titleContainer: 'h2.h3 a',
  description: 'p',
  amountStarsAndForks:
    'div.f6.color-fg-muted.mt-2 a.Link--muted.d-inline-block.mr-3',
  ownerImgSrc: 'img.avatar.mb-1.avatar-user',
  languagesList: '#languages-menuitems a.select-menu-item',
};

export type Language = { label: string; value: string };
export type Repo = {
  id: number;
  owner: string;
  title: string;
  description: string;
  stars: number;
  forks: number;
  link: string | undefined;
  ownerImgSrc: string | undefined;
};

export default class Scraper {
  private $: CheerioAPI | null = null;
  private path: string;
  private language: string;

  constructor(language = languageDefault, path = pathDefault) {
    this.path = encodeURIComponent(path);
    this.language = encodeURIComponent(language);
  }

  public async init() {
    await this.initCheerio(this.path, this.language);
    return this;
  }

  private async initCheerio(path: string, language: string) {
    this.$ = await this.getHtml(path, language);
    logger.info('Cheerio initialized');
  }

  public async getLanguages() {
    const languages: Language[] = [];
    const pattern = /\/([^/?]+)(?:\?|$)/;

    // get html without any language - the value of the language specified will be wrong
    const $ = await this.getHtml('trending', '');

    const languagesList = $(selectors.languagesList);

    languagesList.each((_, element) => {
      const elem = $(element);

      const label = elem.text().trim();
      const value = elem.attr('href');
      const match = value?.match(pattern);
      if (!match) return;
      languages.push({ label, value: match[1] });
    });

    const uniqueLanguages = deduplicateArrayOfObjects<Language>(
      languages,
      'value'
    );

    return uniqueLanguages;
  }

  public async getRepos() {
    const repos: Repo[] = [];
    if (!this.$)
      throw new Error(
        'Scraper was not initialized properly. Please call async function init(), when constructing a new Scraper instance'
      );

    const container = await this.getRepositoriesContainer();

    container.each((idx, element) => {
      const container = this.$!(element);
      const { owner, title, description, stars, forks, link, ownerImgSrc } =
        this.getData(container);

      repos.push({
        id: idx,
        owner,
        title,
        description,
        stars,
        forks,
        link,
        ownerImgSrc,
      });
    });

    console.log('repos', repos[0]);
    return repos;
  }

  private async getHtml(path: string, language: string) {
    const url = baseUrl + '/' + path + '/' + language + queryParamDefault;
    const html = await scrapeUrl(url);
    return load(html);
  }

  private async getRepositoriesContainer() {
    if (!this.$)
      throw new Error(
        'Scraper was not initialized properly. Please call async function init(), when constructing a new Scraper instance'
      );
    return this.$(selectors.container);
  }

  private getData = (container: Cheerio<AnyNode>) => {
    const titleContainer = container.find(selectors.titleContainer);

    const [owner, title] = this.getTitleAndOwner(titleContainer);
    const link = this.getLink(titleContainer);

    const description = this.getDescription(container);
    const [stars, forks] = this.getStarsAndForks(container);
    const ownerImgSrc = this.getOwnerImgSrc(container);
    return {
      owner,
      title,
      description,
      stars,
      forks,
      link,
      ownerImgSrc,
    };
  };

  private getTitleAndOwner(titleContainer: Cheerio<AnyNode>) {
    return titleContainer.text().replace(/\s+/g, '').split('/');
  }

  private getDescription(container: Cheerio<AnyNode>) {
    return container.find(selectors.description).text().trim();
  }

  private getStarsAndForks(container: Cheerio<AnyNode>) {
    return container
      .find(selectors.amountStarsAndForks)
      .map((_, elem) => Number(this.$!(elem).text().trim().replace(',', '')))
      .toArray();
  }

  private getLink(titleContainer: Cheerio<AnyNode>) {
    return titleContainer.attr('href');
  }

  private getOwnerImgSrc(container: Cheerio<AnyNode>) {
    return container
      .find(selectors.ownerImgSrc)
      .first()
      .attr('src')
      ?.replace('s=40&', '');
  }
}
