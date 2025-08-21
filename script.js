import {getNews, getSearchNews} from './fetch.js'

const contentWrap = document.getElementById('contentWrap')
const searchInput = document.querySelector('.search');
const sidebarNews = document.getElementById('sidebarNews');

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
    const defaultImage = 'https://picsum.photos/600'
    const data = {
        urlImage: news.urlToImage ?? defaultImage,
        date: news.publishedAt,
        title: news.title,
        description: news.description ?? '',
        URL: news.url
      };

    const card = `
    <div class="card">
        <div class="card-image-container">
            <img src="${data.urlImage}">
        </div>
        <div class="card-content">
            <div class="card-date">${new Date(data.date).toLocaleDateString()}</div>
            <h2 class="card-title">
                <a href="${data.URL}">${data.title}</a>
            </h2>
            <p class="card-description">${data.description}</p>
        </div>
    </div>`;
    contentWrap.insertAdjacentHTML('beforeend', card)
  });
}

// Fetch and render sidebar news (e.g., trending/latest)
getNews('sports')
  .then(data => renderSidebarNews(data.articles))
  .catch(() => {
    if (sidebarNews) {
      sidebarNews.innerHTML = '<div class="error-message">Failed to load sidebar news.</div>';
    }
  });

function renderSidebarNews(newsData) {
  if (!sidebarNews) return;
  sidebarNews.innerHTML = 'Trending News';
  // Show only the first 5 articles for the sidebar
  (newsData || []).slice(0, 5).forEach(news => {
    const defaultImage = 'https://picsum.photos/60';
    const card = `
      <div class="sidebar-card">
        <img src="${news.urlToImage || defaultImage}" alt="${news.title}">
        <div class="sidebar-card-content">
          <div class="sidebar-card-title">
            <a href="${news.url}" target="_blank" rel="noopener noreferrer">${news.title}</a>
          </div>
          <div class="sidebar-card-date">${new Date(news.publishedAt).toLocaleDateString()}</div>
        </div>
      </div>
    `;
    sidebarNews.insertAdjacentHTML('beforeend', card);
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

function showResultsMessage(message) {
  const resultsMessage = document.getElementById('resultsMessage');
  resultsMessage.textContent = message;
  resultsMessage.style.display = 'flex';
}
