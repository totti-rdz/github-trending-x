import axios from "axios";
import { load } from "cheerio";

const url = "https://github.com/trending/javascript?since=daily";

const selectors = {
  container: ".Box-row",
  titleContainer: "h2.h3 a",
  description: "p",
  additionalInfo:
    "div.f6.color-fg-muted.mt-2 a.Link--muted.d-inline-block.mr-3",
  ownerImgSrc: "img.avatar.mb-1.avatar-user",
};

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = load(html);
    const repos = [];

    $(selectors.container).each((idx, container) => {
      const titleContainer = $(container).find(selectors.titleContainer);
      const [owner, title] = titleContainer
        .text()
        .replace(/\s+/g, "")
        .split("/");
      const description = $(container)
        .find(selectors.description)
        .text()
        .trim();
      const [stars, forks] = $(container)
        .find(selectors.additionalInfo)
        .map((_, elem) => Number($(elem).text().trim().replace(",", "")))
        .toArray();
      const link = titleContainer.attr("href");
      const ownerImgSrc = $(container)
        .find(selectors.ownerImgSrc)
        .first()
        .attr("src")
        ?.replace("s=40&", "");
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

    console.log("repos", repos[0]);
  })
  .catch(console.error);
