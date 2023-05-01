import axios from "axios";
import { load } from "cheerio";

const url = "https://github.com/trending/javascript?since=daily";

const selectors = {
  container: ".Box-row",
  titleContainer: "h2.h3 a",
  description: "p",
  additionalInfo:
    "div.f6.color-fg-muted.mt-2 a.Link--muted.d-inline-block.mr-3",
};

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = load(html);
    const repos = [];

    $(selectors.container).each((idx, elem) => {
      const titleContainer = $(elem).find(selectors.titleContainer);
      const [owner, title] = titleContainer
        .text()
        .replace(/\s+/g, "")
        .split("/");
      const description = $(elem).find(selectors.description).text().trim();
      const stars = Number(
        $(elem)
          .find(selectors.additionalInfo)
          .first()
          .text()
          .trim()
          .replace(",", "")
      );
      const forks = Number(
        $(elem)
          .find(selectors.additionalInfo)
          .last()
          .text()
          .trim()
          .replace(",", "")
      );
      const link = titleContainer.attr("href");
      repos.push({
        id: idx,
        owner,
        title,
        description,
        stars,
        forks,
        link,
      });
    });

    console.log("repos", repos);
  })
  .catch(console.error);
