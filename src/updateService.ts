import { getWeather } from "./weatherApi";

const CACHE_KEY = 'app_data_cache';
const TIMESTAMP_KEY = 'app_data_timestamp';

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
  const fetchData = async () => {
    const currentWindowId = getWindowId();
    const cachedWindowId = localStorage.getItem(TIMESTAMP_KEY);
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (cachedWindowId === currentWindowId && cachedData) {
      console.log("Using cached data for current 15-minute window.");
      return JSON.parse(cachedData, dateReviver);
    }

    console.log("Cache stale or missing. Updating from API...");
    try {
      const data = await getWeather();
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
      localStorage.setItem(TIMESTAMP_KEY, currentWindowId);

      return data;
    } catch (error) {
      console.error("Fetch failed", error);
      return cachedData ? JSON.parse(cachedData, dateReviver) : null;
    }
  };

  return { fetchData };
};
