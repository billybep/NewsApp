import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "YOUR_NEWS_API_KEY"; // https://newsapi.org
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();

      if (data.articles) {
        setArticles(data.articles);
        await AsyncStorage.setItem("cachedNews", JSON.stringify(data.articles));
      }
    } catch (error) {
      console.log("Offline mode: loading cached data...");
      const cachedData = await AsyncStorage.getItem("cachedNews");
      if (cachedData) {
        setArticles(JSON.parse(cachedData));
      }
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchNews();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📰 News App (Offline Mode)</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.desc}>{item.description || "No description available."}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 10, paddingTop: 40 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#fff", padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  title: { fontSize: 16, fontWeight: "bold" },
  desc: { fontSize: 14, color: "#555", marginTop: 5 },
});


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

