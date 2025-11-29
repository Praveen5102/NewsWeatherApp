// App.tsx
import React, { useState } from "react";
import { View, StyleSheet, StatusBar, Text } from "react-native";
import { colors } from "./src/theme/colors";
import { Article, Weather, LocationData } from "./src/types";

export default function App() {
  // State declarations
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [location, setLocation] = useState<LocationData>({
    latitude: 77.1025,
    longitude: 28.7041,
    country: "India",
    city: "Delhi",
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<
    "pending" | "granted" | "denied"
  >("pending");
  const [showPermissionCard, setShowPermissionCard] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>🚧 App Structure Ready</Text>
          <Text style={styles.placeholderNote}>
            ✅ Environment variables configured
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    alignItems: "center",
    padding: 40,
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 8,
  },
  placeholderNote: {
    fontSize: 12,
    color: colors.success,
    fontWeight: "600",
  },
});
