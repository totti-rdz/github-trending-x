import { AnyNode, Cheerio, CheerioAPI, load } from 'cheerio';
import scrapeUrl from '../utils/scrapeUrl';
import { logger } from './logger';

const url =
  'https://github.com/trending/javascript?since=daily&spoken_language_code=en';

const selectors = {
  container: '.Box-row',
  titleContainer: 'h2.h3 a',
  description: 'p',
  amountStarsAndForks:
    'div.f6.color-fg-muted.mt-2 a.Link--muted.d-inline-block.mr-3',
  ownerImgSrc: 'img.avatar.mb-1.avatar-user',
  languagesList: '#languages-menuitems a.select-menu-item',
};

export type Language = { label: string; value: string | undefined };
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
  private static $: CheerioAPI | null = null;

  private static async initCheerio() {
    if (!this.$) {
      this.$ = await this.getHtml();
      logger.info('cheerio initialized');
    }
  }

  public static async getLanguages() {
    const languages: Language[] = [];
    const pattern = /\/([^/?]+)(?:\?|$)/;

    await this.initCheerio();

    const languagesList = this.$!(selectors.languagesList);

    languagesList.each((_, element) => {
      const elem = this.$!(element);

      const label = elem.text().trim();
      const value = elem.attr('href');
      if (!value) return;
      const match = value.match(pattern);
      languages.push({ label, value: match?.[1] });
    });
    return languages;
  }

  public static async getRepos() {
    const repos: Repo[] = [];
    await this.initCheerio();

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

  private static async getHtml() {
    const html = await scrapeUrl(url);
    return load(html);
  }

  private static async getRepositoriesContainer() {
    await this.initCheerio();
    return this.$!(selectors.container);
  }

  private static getData = (container: Cheerio<AnyNode>) => {
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

  private static getTitleAndOwner(titleContainer: Cheerio<AnyNode>) {
    return titleContainer.text().replace(/\s+/g, '').split('/');
  }

  private static getDescription(container: Cheerio<AnyNode>) {
    return container.find(selectors.description).text().trim();
  }

  private static getStarsAndForks(container: Cheerio<AnyNode>) {
    return container
      .find(selectors.amountStarsAndForks)
      .map((_, elem) => Number(this.$!(elem).text().trim().replace(',', '')))
      .toArray();
  }

  private static getLink(titleContainer: Cheerio<AnyNode>) {
    return titleContainer.attr('href');
  }

  private static getOwnerImgSrc(container: Cheerio<AnyNode>) {
    return container
      .find(selectors.ownerImgSrc)
      .first()
      .attr('src')
      ?.replace('s=40&', '');
  }
}
