import { ref } from 'vue';
import { getWeather } from "./weatherApi";

const CACHE_KEYS = {
  WEATHER: "app_weather_data",
  CITY: "app_city_data",
  ALERTS: "app_alerts_data",
  META_WEATHER: "app_weather_meta",
  META_CITY: "app_city_meta",
  META_ALERTS: "app_alerts_meta",
};

const getWindowId = (coords: { latitude: number; longitude: number }) => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const interval = Math.floor(now.getMinutes() / 15);
  const loc = `${coords.latitude.toFixed(2)},${coords.longitude.toFixed(2)}`;
  return `T:${date}-${now.getHours()}-${interval}|L:${loc}`;
};

const dateReviver = (key: string, value: any) => {
  if (key === "time" && value) {
    return new Date(value);
  }

  return value;
};

export const useDataService = () => {
  const isLoading = ref(true);
  const cityLoading = ref(true);

  const isFresh = (metaKey: string, currentId: string) => {
    isLoading.value = false;
    return localStorage.getItem(metaKey) === currentId;
  };

  const fetchWeather = async (location: GeolocationPosition) => {;
    const id = getWindowId(location.coords);

    if (isFresh(CACHE_KEYS.META_WEATHER, id)) {
      console.log("Using cached data for current 15-minute window.");
      const cached = localStorage.getItem(CACHE_KEYS.WEATHER);
      if (cached) return JSON.parse(cached, dateReviver);
    }

    console.log("Cache stale or missing. Updating from API...");
    isLoading.value = true;

    try {
      const data = await getWeather();
      localStorage.setItem(CACHE_KEYS.WEATHER, JSON.stringify(data));
      localStorage.setItem(CACHE_KEYS.META_WEATHER, id);
      return data;
    } catch (error) {
      console.error("Fetch failed", error);
      const fallback = localStorage.getItem(CACHE_KEYS.WEATHER);
      return fallback ? JSON.parse(fallback, dateReviver) : null;
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCityName = async (lat: number, lon: number) => {
    const id = getWindowId({ latitude: lat, longitude: lon });

    if (isFresh(CACHE_KEYS.META_CITY, id)) {
      return localStorage.getItem(CACHE_KEYS.CITY) || "";
    }

    cityLoading.value = true;

    try {
      const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
      const response = await fetch(url);
      const data = await response.json();
      const name = `${data.locality}, ${data.principalSubdivision}`;

      localStorage.setItem(CACHE_KEYS.CITY, name);
      localStorage.setItem(CACHE_KEYS.META_CITY, id);
      return name;
    } catch (error) {
      console.error("Error fetching city name:", error);
      return localStorage.getItem(CACHE_KEYS.CITY) || "";
    } finally {
      cityLoading.value = false;
    }
  }

  const fetchAlerts = async (position: GeolocationPosition) => {
    const id = getWindowId(position.coords);

    if (isFresh(CACHE_KEYS.META_ALERTS, id)) {
      const cached = localStorage.getItem(CACHE_KEYS.ALERTS);
      if (cached) return JSON.parse(cached);
    }

    try {
      const url = `https://api.weather.gov/alerts/active?point=${position.coords.latitude},${position.coords.longitude}`;
      const response = await fetch(url);
      const data = await response.json();

      const alerts: [] = data.features.map((feature: any) => ({
        event: feature.properties.event,
        headline: feature.properties.parameters.NWSheadline[0],
        description: feature.properties.description,
        id: feature.properties.id,
      }));

      localStorage.setItem(CACHE_KEYS.ALERTS, JSON.stringify(alerts));
      localStorage.setItem(CACHE_KEYS.META_ALERTS, id);
      return alerts;
    } catch (error) {
      console.error("Error fetching alerts:", error);
      const fallback = localStorage.getItem(CACHE_KEYS.ALERTS);
      return fallback ? JSON.parse(fallback) : [];
    }
  };

  return { fetchWeather, fetchCityName, fetchAlerts, isLoading, cityLoading };
};
