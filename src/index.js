import axios from "axios";
import { load } from "cheerio";

const url = "https://github.com/trending/javascript?since=daily";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = load(html);
    const repos = [];

    $(".Box-row").each((idx, elem) => {
      const titleContainer = $(elem).find("h2.h3 a");
      const [owner, title] = titleContainer
        .text()
        .replace(/\s+/g, "")
        .split("/");
      const description = $(elem).find("p").text().trim();
      const stars = Number(
        $(elem)
          .find("div.f6.color-fg-muted.mt-2 a.Link--muted.d-inline-block.mr-3")
          .first()
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
        link,
      });
    });

    console.log("repos", repos);
  })
  .catch(console.error);
