import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ArticleScreen from "./src/screens/ArticleScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="News" component={HomeScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} options={{ title: "Article" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
