import config from "../config";

const BASE = "https://newsapi.org/v2";
const PAGE_SIZE = config.PAGE_SIZE || 10;

export const fetchTopHeadlines = async (page = 1) => {
  const url = `${BASE}/top-headlines?country=us&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${config.NEWS_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch news");
  }
  const json = await res.json();
  return json.articles || [];
};
