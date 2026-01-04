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
import Settings from './components/Settings.vue';
import Footer from './components/Footer.vue';
import Radar from './components/Radar.vue';
import { useDataService } from './updateService';

const { fetchWeather, fetchCityName, fetchAlerts, isLoading } = useDataService();

const activeTab = ref('hourly');
const location = ref("");
const weatherData = ref<any>(null);
const alerts = ref([]);
const isSettingsOpen = ref(false);
const appView = ref<"forecast" | "radar" | "settings">("forecast");
const coords = ref<GeolocationPosition>();

navigator.geolocation.getCurrentPosition(success);

async function success(position: GeolocationPosition) {
  setLocation(position);
  const weather = await fetchWeather(position);
  const currentHourIndex = findCurrentHourIndex(weather);
  weather.hourly = weather.hourly.slice(currentHourIndex, currentHourIndex + 24);
  weatherData.value = weather;
  coords.value = position;

  location.value = await fetchCityName(position.coords.latitude, position.coords.longitude);
  alerts.value = await fetchAlerts(position);
}

function findCurrentHourIndex(weather: any) {
  if (!weather) return -1;

  const currentHour = new Date().getHours();

  return weather.hourly.findIndex((item: any) => {
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
  <div class="loading" v-if="isLoading && appView === 'forecast'">
    <SkeletonLoader height="32px" />
    <SkeletonLoader height="166px" />
    <SkeletonLoader height="81px" />
    <SkeletonLoader height="375px" />
  </div>
  <template v-else>
    <Settings :show="isSettingsOpen" @close="isSettingsOpen = false" />
    <div class="forecast" v-if="appView === 'forecast'">
      <Current :location="location" :weatherData="weatherData" @open-settings="isSettingsOpen = true" />
      <Alert :alerts="alerts" v-if="alerts.length > 0" />
      <Today :weatherData="weatherData" />
      <ContentSwitcher v-model="activeTab" />
      <Hourly :weatherData="weatherData" v-if="activeTab === 'hourly'" />
      <Daily :weatherData="weatherData" v-if="activeTab === 'daily'" />
    </div>
    <template v-if="appView === 'radar'">
    <Radar :location="coords" />
    </template>
    <Footer @viewChange="(view: any) => appView = view" @open-settings="isSettingsOpen = !isSettingsOpen" />
  </template>
</template>

<style lang="scss">
.loading {
  display: flex;
  flex-direction: column;
  gap: $spacing-07;
  margin-top: $spacing-08;
}

.forecast, .loading {
  padding: 0 $spacing-05;
  height: calc(100% - $spacing-08);
  overflow: scroll;
}
</style>
