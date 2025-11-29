// src/types/index.ts
export interface Article {
  id: string;
  title: string;
  description: string;
  image: string | null;
  url: string;
  source: { name: string };
  publishedAt: string;
}

export interface Weather {
  temp: number;
  condition: string;
  icon: string;
  location: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  pressure: number;
}

export interface LocationData {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
}

export interface GeocodeData {
  country: string;
  city: string;
}
