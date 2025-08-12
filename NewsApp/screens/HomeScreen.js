import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../services/newsApi";
import { saveData, getData } from "../utils/storage";

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const loadNews = async (pageNum = 1, isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      const data = await fetchNews(pageNum);
      if (pageNum === 1) {
        setArticles(data);
        saveData("cachedNews", data);
      } else {
        setArticles((prev) => [...prev, ...data]);
      }
    } catch (error) {
      console.log("Offline mode: using cached data");
      const cached = await getData("cachedNews");
      if (cached) setArticles(cached);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    loadNews(1, true);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadNews(nextPage);
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <NewsCard article={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
