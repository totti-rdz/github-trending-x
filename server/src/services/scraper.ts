import { AnyNode, Cheerio, CheerioAPI, load } from 'cheerio';
import scrapeUrl from '../utils/scrapeUrl';
import { logger } from './logger';
import { deduplicateArrayOfObjects } from '../utils/deduplicateArrayOfObjects';
import { concatUrl } from '../utils/concatStrings';

const baseUrl = 'https://github.com/trending';

const pathDefault = '';
const languageDefault = 'javascript';
const queryParamsDefault = '?since=daily'; //&spoken_language_code=en';

const selectors = {
  container: 'article.Box-row',
  titleContainer: 'h2.h3 a',
  description: 'p',
  amountStarsAndForks:
    'div.f6.color-fg-muted.mt-2 a.Link--muted.d-inline-block.mr-3',
  ownerImgSrc: 'img.avatar.mb-1.avatar-user',
  languagesList: '#languages-menuitems a.select-menu-item',
  containerDevelopers: 'article.Box-row.d-flex',
  nameDeveloper: 'h1.h3.lh-condensed',
  userNameDeveloper: 'a.Link--secondary.Link',
  linkDeveloper: 'h1.h3.lh-condensed a',
  developerImgSrc: 'img.rounded.avatar-user',
  developerPopularRepo: 'h1.h4.lh-condensed a',
  developerPopularRepoDescription: 'div.f6.color-fg-muted.mt-1',
  developerCompany:
    'p.mb-3.d-flex.flex-items-center span.Truncate span.Truncate-text',
  developerDateJoined:
    'div.f5.color-fg-muted.my-2.my-md-0 p.mb-3:has(svg.octicon-clock)',
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

type Developer = {
  avatarImgSrc: string | undefined;
  company: string;
  dateJoined?: string;
  link: string | undefined;
  id: number;
  name: string;
  popularRepo: {
    title: string;
    description?: string;
    link?: string;
  };
  userName: string;
};

export default class Scraper {
  private $: CheerioAPI | null = null;
  private path: string;
  private language: string;
  private queryParams: string;

  constructor(
    path = pathDefault,
    language = languageDefault,
    queryParams = queryParamsDefault
  ) {
    this.path = encodeURIComponent(path);
    this.language = encodeURIComponent(language);
    this.queryParams = queryParams;
  }

  public async init() {
    await this.initCheerio(this.path, this.language, this.queryParams);
    return this;
  }

  private async initCheerio(
    path: string,
    language: string,
    queryParams: string
  ) {
    this.$ = await this.getHtml(path, language, queryParams);
    logger.info('Cheerio initialized');
  }

  public async getLanguages() {
    const languages: Language[] = [];
    const pattern = /\/([^/?]+)(?:\?|$)/;

    // get html without any language - the value of the language specified will be wrong
    const $ = await this.getHtml('trending', '', '');

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

  private async getHtml(path: string, language: string, queryParams: string) {
    const url = concatUrl(baseUrl, path, language, queryParams);
  
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
      ?.replace('s=40&', ''); // remove size to get full image
  }

  public async getDevelopers() {
    const developers: Developer[] = [];
    if (!this.$)
      throw new Error(
        'Scraper was not initialized properly. Please call async function init(), when constructing a new Scraper instance'
      );

    const container = await this.getDevelopersContainer();

    container.each((idx, element) => {
      const container = this.$!(element);
      const {
        avatarImgSrc,
        company,
        dateJoined,
        link,
        name,
        popularRepo,
        userName,
      } = this.getDeveloperData(container);

      developers.push({
        avatarImgSrc,
        company,
        dateJoined,
        id: idx,
        link,
        name,
        popularRepo,
        userName,
      });
    });

    return developers;
  }

  private async getDevelopersContainer() {
    if (!this.$)
      throw new Error(
        'Scraper was not initialized properly. Please call async function init(), when constructing a new Scraper instance'
      );
    return this.$(selectors.containerDevelopers);
  }

  private getDeveloperData(container: Cheerio<AnyNode>) {
    const name = container.find(selectors.nameDeveloper).text().trim();
    const userName = container.find(selectors.userNameDeveloper).text().trim();
    const link = container.find(selectors.linkDeveloper).attr('href');
    const avatarImgSrc = container
      .find(selectors.developerImgSrc)
      .attr('src')
      ?.replace('s=96&', ''); // remove size to get full image
    const popularRepoTitle = container
      .find(selectors.developerPopularRepo)
      .text()
      .trim();
    const popularRepoLink = container
      .find(selectors.developerPopularRepo)
      .attr('href');
    const popularRepoDescription = container
      .find(selectors.developerPopularRepoDescription)
      .text()
      .trim();
    const company = container.find(selectors.developerCompany).text().trim();
    const dateJoined = container
      .find(selectors.developerDateJoined)
      .text()
      .trim();

    return {
      avatarImgSrc,
      company,
      dateJoined: dateJoined || undefined,
      link,
      name,
      popularRepo: {
        title: popularRepoTitle,
        link: popularRepoLink,
        description: popularRepoDescription,
      },
      userName,
    };
  }
}
