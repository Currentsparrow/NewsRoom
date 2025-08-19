import { fetchNews } from "./fetch.js";

fetchNews().then(newsArticles => {
    console.log(newsArticles);
});