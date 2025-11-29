// src/services/api.ts
import { Article, Weather, GeocodeData } from "../types";

// ✅ Using environment variables for API keys
const GNEWS_API_KEY = process.env.EXPO_PUBLIC_GNEWS_API_KEY;
const OPENWEATHER_API_KEY = process.env.EXPO_PUBLIC_OPENWEATHER_API_KEY;

// Validate API keys are present
if (!GNEWS_API_KEY || !OPENWEATHER_API_KEY) {
  console.error("⚠️ API keys are missing. Please check your .env file");
}

export const fetchNewsArticles = async (
  query: string
): Promise<Article[] | null> => {
  try {
    const cleanQuery = query.replace("Google", "").trim();
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        cleanQuery
      )}&lang=en&max=20&apikey=${GNEWS_API_KEY}`
    );
    const data = await response.json();

    if (data.articles && Array.isArray(data.articles)) {
      return data.articles.map((article: any, index: number) => ({
        id: `${article.url}-${index}`,
        title: article.title,
        description: article.description || "No description available",
        image: article.image,
        url: article.url,
        source: { name: article.source.name },
        publishedAt: article.publishedAt,
      }));
    }
    return [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
};

export const fetchWeatherData = async (
  latitude: number,
  longitude: number
): Promise<Weather | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    const data = await response.json();

    if (data.main && data.weather) {
      return {
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        feelsLike: Math.round(data.main.feels_like),
        pressure: data.main.pressure,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<GeocodeData | null> => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.length > 0) {
      return {
        country: data[0].country || "Unknown",
        city: data[0].name || data[0].local_names?.en || "Unknown",
      };
    }

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}`
    );
    const weatherData = await weatherResponse.json();

    if (weatherData.sys && weatherData.name) {
      return {
        country: weatherData.sys.country || "Unknown",
        city: weatherData.name || "Unknown",
      };
    }

    return null;
  } catch (error) {
    console.error("Error reverse geocoding:", error);
    return null;
  }
};
