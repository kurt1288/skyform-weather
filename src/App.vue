<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { setLocation } from '@/weatherApi';
import Current from './components/Current.vue';
import Hourly from './components/Hourly.vue';
import Today from './components/Today.vue';
import Daily from './components/Daily.vue';
import ContentSwitcher from './components/ContentSwitcher.vue';
import SkeletonLoader from './components/SkeletonLoader.vue';
import { useDataService } from './updateService';

const { fetchData } = useDataService();

const isLoading = ref(true);
const activeTab = ref('hourly');
const location = ref("");
const weatherData = ref<any>(null);

navigator.geolocation.getCurrentPosition(success);

async function success(position: GeolocationPosition) {
  isLoading.value = true;
  setLocation(position);
  weatherData.value = await fetchData(position);
  getCityName(position.coords.latitude, position.coords.longitude);

  const currentHourIndex = findCurrentHourIndex();
  weatherData.value.hourly = weatherData.value.hourly.slice(currentHourIndex, currentHourIndex + 24);
  isLoading.value = false;
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

const handleVisibilityChange = () => {
  if (document.visibilityState === 'visible') {
    navigator.geolocation.getCurrentPosition(success);
  }
};

onMounted(() => {
  document.addEventListener('visibilitychange', handleVisibilityChange);
});

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
});
</script>

<template>
  <div class="globalContainer">
    <div class="loading" v-if="isLoading">
      <SkeletonLoader height="175px" />
      <SkeletonLoader height="125px" />
      <SkeletonLoader height="350px" />
    </div>
    <template v-else>
      <Current :location="location" :weatherData="weatherData" />
      <Today :weatherData="weatherData" />
      <ContentSwitcher v-model="activeTab" />
      <Hourly :weatherData="weatherData" v-if="activeTab === 'hourly'" />
      <Daily :weatherData="weatherData" v-if="activeTab === 'daily'" />
    </template>
  </div>
</template>

<style lang="scss">
.loading {
  display: flex;
  flex-direction: column;
  gap: $spacing-07;
}
</style>
