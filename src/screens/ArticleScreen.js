import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function ArticleScreen({ route }) {
  const { article } = route.params;
  return (
    <View style={styles.container}>
      <WebView source={{ uri: article.url }} startInLoadingState />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
