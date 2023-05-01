import axios from "axios";
import { load } from "cheerio";

const url = "https://github.com/trending/javascript?since=daily";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = load(html);
    const repos = [];
    $("h2.h3 a").each((idx, elem) => {
      const [owner, title] = $(elem).text().replace(/\s+/g, "").split("/");
      const link = $(elem).attr("href");
      repos.push({ id: idx, owner, title, link });
    });

    console.log("repos", repos);
  })
  .catch(console.error);
