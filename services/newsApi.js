export const fetchNews = async (page = 1) => {
  const API_KEY = "5072e5454f514128ba7b338b52e5e102"; //newsapi.org
  const URL = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&page=${page}&apiKey=${API_KEY}`;

  const res = await fetch(URL);
  const json = await res.json();
  return json.articles;
};
