const API_KEY = 'e9d34a7a622b49fb8122620d47a1613b';
const BASE_URL = 'https://newsapi.org/v2';

export async function getNews() {
    try {
    const getNewsNewsDataApi = await 
    fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
    return getNewsNewsDataApi.json();
    } catch (error) {
        console.log(error);
    }
}

export async function getSearchNews(query) {
    try {
        const searchNewsDataApi = await fetch(`${BASE_URL}/everything?q=${query}&apiKey=${API_KEY}`);
        return searchNewsDataApi.json();
    } catch (error) {
        console.log(error);
    }
}