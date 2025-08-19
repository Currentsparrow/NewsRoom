const API_KEY = 'e9d34a7a622b49fb8122620d47a1613b';
const BASE_URL = 'https://newsapi.org/v2';

export async function fetchNews() {
    try {
    const fetchNewsDataApi = await fetch(`${BASE_URL}/top-headlines?country=us&apiKey=${API_KEY}`);
    console.log(await fetchNewsDataApi.json());
    } catch (error) {
        console.log(error);
    }
}