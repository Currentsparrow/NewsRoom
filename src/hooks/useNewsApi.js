import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';

async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return response.json();
}

export function useNewsApi() {
  const [data, setData] = useState({ articles: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getNews = async (category = 'general', pageSize = 20) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${BASE_URL}/top-headlines?country=us&category=${category}&pageSize=${pageSize}&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const result = await handleResponse(response);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData({ articles: [] });
    } finally {
      setLoading(false);
    }
  };

  const getSearchNews = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${BASE_URL}/everything?q=${query}&sortBy=publishedAt&language=en&apiKey=${API_KEY}`;
      const response = await fetch(url);
      const result = await handleResponse(response);
      setData(result);
    } catch (err) {
      setError(err.message);
      setData({ articles: [] });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, getNews, getSearchNews };
}