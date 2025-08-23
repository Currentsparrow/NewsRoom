import { getNews, getSearchNews } from './fetch.js';
import { createNewsCard, createSidebarCard, createSkeletonCard, createIntroMessage } from './components.js';

const navLinks = document.querySelectorAll('.nav-link');
const mainContentArea = document.getElementById('main-content-area');
const sidebarNewsArea = document.getElementById('sidebar-news-area');
const searchInput = document.querySelector('.search');


const appState = {
    currentCategory: 'general',
    newsArticles: [],
    isLoading: false,
    error: null,
};


const render = (container, content) => {
    container.innerHTML = content;
};

const renderNewsGrid = (articles, limit = articles.length) => {
    if (articles.length === 0) {
        return '<div class="no-results-message">No news articles found.</div>';
    }
    const cards = articles.slice(0, limit).map(createNewsCard).join('');
    return `<div class="news-grid">${cards}</div>`;
};

const renderSkeletons = (count) => {
    const skeletons = Array(count).fill(createSkeletonCard()).join('');
    return `<div class="news-grid">${skeletons}</div>`;
};

const renderMainContent = () => {
    if (appState.isLoading) {
        if (appState.currentCategory === 'general') {
            render(mainContentArea, createIntroMessage() + renderSkeletons(2));
        } else {
            render(mainContentArea, renderSkeletons(6));
        }
    } else if (appState.error) {
        render(mainContentArea, `<div class="error-message">${appState.error}</div>`);
    } else {
        if (appState.currentCategory === 'general') {
            render(mainContentArea, createIntroMessage() + renderNewsGrid(appState.newsArticles, 2));
        } else {
            render(mainContentArea, renderNewsGrid(appState.newsArticles));
        }
    }
};

const renderSidebar = (articles) => {
    if (articles.length === 0) {
        sidebarNewsArea.innerHTML = '<h3>Trending News</h3><div class="error-message">Failed to load trending news.</div>';
        return;
    }
    const cards = articles.map(createSidebarCard).join('');
    sidebarNewsArea.innerHTML = `<h3>Trending News</h3>${cards}`;
};


const fetchAndRenderNews = async (category, isSearch = false) => {
    appState.isLoading = true;
    appState.error = null;
    appState.currentCategory = category;
    renderMainContent();
    let data;
    if (isSearch) {
        data = await getSearchNews(category);
    } else {
        data = await getNews(category, 20); 
    }

    if (data.articles) {
        appState.newsArticles = data.articles;
        appState.error = null;
    } else {
        appState.error = 'Failed to load news. Please try again later.';
    }

    appState.isLoading = false;
    renderMainContent();
};

const fetchAndRenderSidebar = async () => {
    const data = await getNews('general', 5);
    renderSidebar(data.articles);
};


navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const category = event.target.getAttribute('data-category');
        fetchAndRenderNews(category);
    });
});

searchInput.addEventListener('input', (event) => {
    const query = event.target.value.trim();
    if (query.length > 2) {
        fetchAndRenderNews(query, true);
    } else if (query.length === 0) {
        fetchAndRenderNews('general');
    }
});


document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderNews('general');
    fetchAndRenderSidebar();
});