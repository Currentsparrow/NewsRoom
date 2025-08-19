import {getNews, getSearchNews} from './fetch.js'

const contentWrap = document.getElementById('contentWrap')
const searchInput = document.querySelector('.search');
// Fetch news data and render it
contentWrap.innerHTML = '<div class="loading-message">Loading news...</div>';
getNews()
  .then(data => renderNews(data.articles))
  .catch(() => {
    contentWrap.innerHTML = '<div class="error-message">Failed to load news. Please try again later.</div>';
  });

function renderNews(newsData) {
  if (!newsData || newsData.length === 0) {
    contentWrap.innerHTML = '<div class="no-results-message">No news articles found.</div>';
    return;
  }
  contentWrap.innerHTML = '';
  newsData.forEach(news => {
    const data = {
        urlImage: news.urlToImage,
        date: news.publishedAt,
        title: news.title,
        description: news.description,
        URL: news.url
      };

    const card = `
    <div class="card">
        <div class="card-image-container">
            <img src="${data.urlImage}">
        </div>
        <div class="card-content">
            <span class="card-date">${data.date}</span>
            <h2 class="card-title">
                <a href="${data.URL}">${data.title}</a>
            </h2>
            <p class="card-description">${data.description}</p>
        </div>
    </div>`;
    contentWrap.insertAdjacentHTML('beforeend', card)
  });
}

searchInput.addEventListener('input', event => {
  const inputSearchValue = event.target.value.trim();

  contentWrap.innerHTML = '<div class="loading-message">Loading news...</div>';

  if (inputSearchValue === '') {
    getNews()
      .then(data => renderNews(data.articles))
      .catch(() => {
        contentWrap.innerHTML = '<div class="error-message">Failed to load news. Please try again later.</div>';
      });
  } else {
    getSearchNews(inputSearchValue)
      .then(data => renderNews(data.articles))
      .catch(() => {
        contentWrap.innerHTML = '<div class="error-message">Failed to load search results. Please try again later.</div>';
      });
  }
});
