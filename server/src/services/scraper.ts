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
};

export default class Scraper {
  private static repos: any[] = [];
  private static $: CheerioAPI | null = null;

  private static async initCheerio() {
    this.$ = await this.getHtml();
  }

  private static validateCheerioInstance(methodName?: string) {
    if (!this.$) {
      if (!!methodName) {
        logger.error(`Error was thrown in: ${methodName}`);
      }
      throw new Error('Cheerio not yet initialized');
    }
  }

  public static async getRepos() {
    await this.initCheerio();
    this.validateCheerioInstance('getRepos');

    const container = await this.getRepositoriesContainer();

    container.each((idx, element) => {
      const container = this.$!(element);
      const { owner, title, description, stars, forks, link, ownerImgSrc } =
        this.getData(container);

      this.repos.push({
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

    console.log('repos', this.repos[0]);
    return this.repos;
  }

  private static async getHtml() {
    const html = await scrapeUrl(url);
    return load(html);
  }

  private static async getRepositoriesContainer() {
    this.validateCheerioInstance('getRepositoriesContainer');
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
