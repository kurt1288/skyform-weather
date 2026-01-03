import { ref } from 'vue';
import { getWeather } from "./weatherApi";

const CACHE_KEY = 'app_data_cache';
const TIMESTAMP_KEY = 'app_data_timestamp';
const LOCATION_KEY = 'app_data_location';
const CITY_KEY = 'app_data_city';
const ALERTS_KEY = 'app_data_alerts';

const getWindowId = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const interval = Math.floor(now.getMinutes() / 15);
  return `${date}-${now.getHours()}-${interval}`;
};

const dateReviver = (key: string, value: any) => {
  if (key === "time" && value) {
    return new Date(value);
  }

  return value;
};

export const useDataService = () => {
  const isLoading = ref(true);
  let shouldUpdateAlerts = false;
  let shouldUpdateCity = false;

  const fetchWeather = async (location: GeolocationPosition) => {;
    const currentWindowId = getWindowId();
    const cachedWindowId = localStorage.getItem(TIMESTAMP_KEY);
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedLocation = localStorage.getItem(LOCATION_KEY);

    if (cachedLocation === `${location.coords.latitude} ${location.coords.longitude}` && cachedWindowId === currentWindowId && cachedData) {
      console.log("Using cached data for current 15-minute window.");
      isLoading.value = false;
      return JSON.parse(cachedData, dateReviver);
    }

    if (cachedLocation !== `${location.coords.latitude} ${location.coords.longitude}`) {
      shouldUpdateCity = true;
    }

    console.log("Cache stale or missing. Updating from API...");
    shouldUpdateAlerts = true;
    isLoading.value = true

    try {
      const data = await getWeather();
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(TIMESTAMP_KEY, currentWindowId);
      localStorage.setItem(LOCATION_KEY, `${location.coords.latitude} ${location.coords.longitude}`);
      isLoading.value = false;
      return data;
    } catch (error) {
      console.error("Fetch failed", error);
      isLoading.value = false;
      return cachedData ? JSON.parse(cachedData, dateReviver) : null;
    }
  };

  const fetchCityName = async (lat: number, lon: number) => {
    const cachedLocation = localStorage.getItem(LOCATION_KEY);
    const cachedCity = localStorage.getItem(CITY_KEY);

    if (!shouldUpdateCity && cachedLocation === `${lat} ${lon}` && cachedCity) {
      return cachedCity;
    }

    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      localStorage.setItem(CITY_KEY, `${data.locality}, ${data.principalSubdivision}`);
      shouldUpdateCity = false;
      return `${data.locality}, ${data.principalSubdivision}`;
    } catch (error) {
      shouldUpdateCity = false;
      console.error("Error fetching city name:", error);
      return "";
    }
  }

  const fetchAlerts = async (position: GeolocationPosition) => {
    const cachedLocation = localStorage.getItem(LOCATION_KEY);
    const cachedAlerts = localStorage.getItem(ALERTS_KEY);

    if (cachedLocation === `${position.coords.latitude} ${position.coords.longitude}` && !shouldUpdateAlerts && cachedAlerts) {
      return JSON.parse(cachedAlerts);
    }

    const url = `https://api.weather.gov/alerts/active?point=${position.coords.latitude},${position.coords.longitude}`;
    shouldUpdateAlerts = false;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const alerts: [] = data.features.map((feature: any) => {
        return {
          event: feature.properties.event,
          headline: feature.properties.parameters.NWSheadline[0],
          description: feature.properties.description,
          id: feature.properties.id,
        }
      });

      localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts));
      return alerts;
    } catch (error) {
      console.error("Error fetching alerts:", error);
      return cachedAlerts ? JSON.parse(cachedAlerts) : [];
    }
  };

  return { fetchWeather, fetchCityName, fetchAlerts, isLoading };
};
