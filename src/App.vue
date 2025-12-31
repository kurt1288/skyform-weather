<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { setLocation } from '@/weatherApi';
import Current from './components/Current.vue';
import Hourly from './components/Hourly.vue';
import Today from './components/Today.vue';
import Daily from './components/Daily.vue';
import Alert from './components/Alert.vue';
import ContentSwitcher from './components/ContentSwitcher.vue';
import SkeletonLoader from './components/SkeletonLoader.vue';
import { useDataService } from './updateService';

const { fetchWeather, fetchCityName, fetchAlerts, isLoading } = useDataService();

const activeTab = ref('hourly');
const location = ref("");
const weatherData = ref<any>(null);
const alerts = ref([]);

navigator.geolocation.getCurrentPosition(success);

async function success(position: GeolocationPosition) {
  setLocation(position);
  weatherData.value = await fetchWeather(position);
  location.value = await fetchCityName(position.coords.latitude, position.coords.longitude);
  alerts.value = await fetchAlerts(position);

  const currentHourIndex = findCurrentHourIndex();
  weatherData.value.hourly = weatherData.value.hourly.slice(currentHourIndex, currentHourIndex + 24);
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
      <Alert :alerts="alerts" v-if="alerts.length > 0" />
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
