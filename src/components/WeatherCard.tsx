// src/components/WeatherCard.tsx
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Weather } from "../types";
import { LinearGradient } from "expo-linear-gradient";

interface WeatherCardProps {
  weather: Weather;
  onRefresh: () => Promise<void>;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onRefresh }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await onRefresh();
    setTimeout(() => setRefreshing(false), 1000);
  };

  const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("rain")) return "🌧️";
    if (conditionLower.includes("cloud")) return "☁️";
    if (conditionLower.includes("clear") || conditionLower.includes("sunny"))
      return "☀️";
    if (conditionLower.includes("snow")) return "❄️";
    if (conditionLower.includes("wind")) return "💨";
    if (conditionLower.includes("thunder")) return "⛈️";
    if (conditionLower.includes("mist") || conditionLower.includes("fog"))
      return "🌫️";
    return "🌤️";
  };

  const getGradientColors = (condition: string): readonly [string, string] => {
    const conditionLower = condition.toLowerCase();
    if (conditionLower.includes("rain")) return ["#667eea", "#764ba2"] as const;
    if (conditionLower.includes("cloud"))
      return ["#a8edea", "#fed6e3"] as const;
    if (conditionLower.includes("clear") || conditionLower.includes("sunny"))
      return ["#FFB75E", "#ED8936"] as const;
    if (conditionLower.includes("snow")) return ["#667eea", "#764ba2"] as const;
    return ["#667eea", "#764ba2"] as const;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors(weather.condition)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Current Weather</Text>
          <TouchableOpacity
            onPress={handleRefresh}
            disabled={refreshing}
            style={styles.refreshButton}
          >
            {refreshing ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.refreshText}>↻</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.leftSection}>
            <Text style={styles.icon}>{getWeatherIcon(weather.condition)}</Text>
            <View>
              <Text style={styles.temp}>{weather.temp}°</Text>
              <Text style={styles.condition}>{weather.condition}</Text>
              <Text style={styles.feelsLike}>
                Feels like {weather.feelsLike}°
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Humidity</Text>
            <Text style={styles.statValue}>{weather.humidity}%</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Wind</Text>
            <Text style={styles.statValue}>{weather.windSpeed} km/h</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Pressure</Text>
            <Text style={styles.statValue}>{weather.pressure} mb</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginVertical: 12,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  gradient: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  refreshButton: {
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 10,
  },
  refreshText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 64,
    marginRight: 16,
  },
  temp: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  condition: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 4,
    fontWeight: "600",
    opacity: 0.9,
  },
  feelsLike: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 2,
    fontWeight: "500",
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  statLabel: {
    fontSize: 11,
    color: "#FFFFFF",
    fontWeight: "600",
    opacity: 0.8,
  },
  statValue: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "700",
    marginTop: 4,
  },
});
