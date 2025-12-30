<script setup lang="ts">
import { setLocation, getWeather } from '@/weatherApi';
import Current from './components/Current.vue';
import Hourly from './components/Hourly.vue';
import Today from './components/Today.vue';
import Daily from './components/Daily.vue';
import ContentSwitcher from './components/ContentSwitcher.vue';

import { ref } from 'vue';

const activeTab = ref('hourly');
const location = ref("");
const weatherData = ref<any>(null);

navigator.geolocation.getCurrentPosition(success);

async function success(position: GeolocationPosition) {
  setLocation(position);
  weatherData.value = await getWeather();
  getCityName(position.coords.latitude, position.coords.longitude);

  const currentHourIndex = findCurrentHourIndex();
  weatherData.value.hourly = weatherData.value.hourly.slice(currentHourIndex, currentHourIndex + 24);
}

async function getCityName(lat: number, lon: number) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        location.value = `${data.city}, ${data.principalSubdivision}`;
        return data.city || data.locality || "Unknown City";
    } catch (error) {
        console.error("Error fetching city name:", error);
    }
}

function findCurrentHourIndex() {
  if (!weatherData) return -1;

  const currentHour = new Date().getHours();

  return weatherData.value.hourly.findIndex((item: any) => {
    return item.time.getHours() === currentHour;
  });
}
</script>

<template>
  <div class="globalContainer">
    <Current :location="location" :weatherData="weatherData" />
    <Today :weatherData="weatherData" />
    <ContentSwitcher v-model="activeTab" />
    <Hourly :weatherData="weatherData" v-if="activeTab === 'hourly'" />
    <Daily :weatherData="weatherData" v-if="activeTab === 'daily'" />
  </div>
</template>

<style lang="scss">
</style>
