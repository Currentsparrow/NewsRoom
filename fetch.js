const API_KEY = 'e9d34a7a622b49fb8122620d47a1613b';
const BASE_URL = 'https://newsapi.org/v2';

async function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export async function getNews(category = 'general', pageSize = 20) {
    try {
        const url = `${BASE_URL}/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${API_KEY}`;
        const response = await fetch(url);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return { articles: [] };
    }
}

export async function getSearchNews(query) {
    try {
        const url = `${BASE_URL}/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
        const response = await fetch(url);
        return handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch search results:", error);
        return { articles: [] };
    }
}