import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Linking,
  Text,
} from "react-native";
import * as Location from "expo-location";
import NewsCard from "./src/components/NewsCard";
import SearchBar from "./src/components/SearchBar";
import WeatherCard from "./src/components/WeatherCard";
import HeaderSection from "./src/components/HeaderSection";
import { colors } from "./src/theme/colors";
import { Article, Weather, LocationData } from "./src/types";
import {
  fetchNewsArticles,
  fetchWeatherData,
  reverseGeocode,
} from "./src/services/api";

export default function App() {
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

  // Request location permission and fetch location
  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationPermissionStatus("denied");
        Alert.alert(
          "Permission Denied",
          "Location permission denied. Using Delhi, India as default location."
        );
        return false;
      }

      setLocationPermissionStatus("granted");

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = currentLocation.coords;
      setLocation((prev) => ({ ...prev, latitude, longitude }));

      // Reverse geocode to get country and city
      const geocodeData = await reverseGeocode(latitude, longitude);
      if (geocodeData) {
        setLocation((prev) => ({
          ...prev,
          country: geocodeData.country,
          city: geocodeData.city,
        }));
      }
      return true;
    } catch (error) {
      setLocationPermissionStatus("denied");
      Alert.alert("Could not fetch location. Using default location.");
      return false;
    }
  }, []);

  // Fetch weather data
  const fetchWeather = useCallback(async () => {
    try {
      const weatherData = await fetchWeatherData(
        location.latitude,
        location.longitude
      );
      if (weatherData) {
        setWeather(weatherData);
      }
    } catch (error) {
      console.error("Weather fetch error:", error);
    }
  }, [location]);

  // Fetch news articles - fetches trending news based on location
  const fetchNews = useCallback(async () => {
    try {
      setLoading(true);
      const query = searchQuery || `${location.country} trending`;
      const newsData = await fetchNewsArticles(query);
      if (newsData) {
        setArticles(newsData);
        setFilteredArticles(newsData);
      }
    } catch (error) {
      console.error("News fetch error:", error);
      Alert.alert("Error", "Could not fetch news articles. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [location.country, searchQuery]);

  // Handle search with dynamic filtering
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (query.trim()) {
        const filtered = articles.filter(
          (article) =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.description.toLowerCase().includes(query.toLowerCase()) ||
            article.source.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredArticles(filtered);
      } else {
        setFilteredArticles(articles);
        fetchNews();
      }
    },
    [articles, fetchNews]
  );

  // Handle article press
  const handleArticlePress = (url: string) => {
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Could not open article");
    });
  };

  // Refresh handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
    fetchWeather();
  }, [fetchNews, fetchWeather]);

  // Initial load - check permission status
  useEffect(() => {
    const initializeApp = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();

      if (status === "granted") {
        setLocationPermissionStatus("granted");
        await requestLocationPermission();
      } else {
        setLocationPermissionStatus("denied");
        console.log("Using default location: Delhi, India");
      }
    };
    initializeApp();
  }, []);

  // Fetch weather and news when location changes
  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      locationPermissionStatus !== "pending"
    ) {
      fetchWeather();
      fetchNews();
    }
  }, [location, locationPermissionStatus, fetchWeather, fetchNews]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        <HeaderSection
          locationName={weather?.location || location.city}
          country={location.country}
          isDefaultLocation={locationPermissionStatus === "denied"}
          onEnableLocation={requestLocationPermission}
          showEnableButton={locationPermissionStatus !== "granted"}
        />

        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search news by keyword..."
        />

        {weather && <WeatherCard weather={weather} onRefresh={fetchWeather} />}

        <View style={styles.newsSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? "Search Results" : `Latest in ${location.country}`}
          </Text>
        </View>

        {loading && !articles.length ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Loading news...</Text>
          </View>
        ) : (
          <>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onPress={() => handleArticlePress(article.url)}
                />
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsEmoji}>📰</Text>
                <Text style={styles.noResultsText}>No articles found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try a different search term
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
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
  },
  newsSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  noResultsContainer: {
    paddingVertical: 80,
    alignItems: "center",
  },
  noResultsEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  noResultsText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: "600",
    marginBottom: 4,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "400",
  },
});
