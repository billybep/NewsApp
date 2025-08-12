import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function NewsCard({ article, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {article.urlToImage ? (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      ) : null}
      <View style={styles.body}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.source}>{article.source?.name || "Unknown"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: "#fff", margin: 10, borderRadius: 8, overflow: "hidden", elevation: 2 },
  image: { height: 180, width: "100%" },
  body: { padding: 10 },
  title: { fontSize: 16, fontWeight: "600", marginBottom: 6 },
  source: { fontSize: 12, color: "#666" },
});


// import React from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";

// export default function NewsCard({ article }) {
//   return (
//     <TouchableOpacity onPress={() => Linking.openURL(article.url)}>
//       <View style={styles.card}>
//         {article.urlToImage && (
//           <Image source={{ uri: article.urlToImage }} style={styles.image} />
//         )}
//         <Text style={styles.title}>{article.title}</Text>
//         <Text style={styles.desc} numberOfLines={3}>{article.description}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// }

// const styles = StyleSheet.create({
//   card: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   image: {
//     height: 200,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginVertical: 5,
//   },
//   desc: {
//     fontSize: 14,
//     color: "#555",
//   },
// });
