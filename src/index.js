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
      const link = titleContainer.attr("href");
      repos.push({ id: idx, owner, title, link });
    });

    console.log("repos", repos);
  })
  .catch(console.error);
