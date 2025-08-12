import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import NewsCard from "../screens/components/NewsCard";
import { fetchTopHeadlines } from "../services/newsApi";
import { saveData, getData } from "../utils/storage";
import config from "../config";

export default function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadNews = async (pageNum = 1, isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const data = await fetchTopHeadlines(pageNum);
      if (pageNum === 1) {
        setArticles(data);
        await saveData("cachedNews", data);
      } else {
        setArticles((prev) => [...prev, ...data]);
      }
      setHasMore(data.length === config.PAGE_SIZE);
    } catch (err) {
      console.warn("Fetch failed, loading cache", err.message);
      const cached = await getData("cachedNews");
      if (cached) setArticles(cached);
      setHasMore(false);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadNews(1);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    loadNews(1, true);
  }, []);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    loadNews(next);
  };

  return (
    <View style={styles.container}>
      {loading && page === 1 ? (
        <ActivityIndicator size={20} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, idx) => item.url + idx}
          renderItem={({ item }) => (
            <NewsCard
              article={item}
              onPress={() => navigation.navigate("Article", { article: item })}
            />
          )}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() => (hasMore ? <ActivityIndicator /> : <Text style={styles.end}>No more articles</Text>)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f7f7" },
  end: { textAlign: "center", padding: 12, color: "#666" },
});
