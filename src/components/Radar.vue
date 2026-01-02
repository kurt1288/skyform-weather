<script setup lang="ts">
const props = defineProps<{
  location?: GeolocationPosition
}>();

import { ref, onMounted, onUnmounted } from 'vue';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const mapContainer = ref<HTMLElement | null>(null);

let map: L.Map | null = null;
let radarLayer: L.TileLayer.WMS | null = null;
let refreshInterval: number | undefined;

onMounted(() => {
  if (!mapContainer.value ||!props.location) return;

  map = L.map(mapContainer.value).setView([props.location.coords.latitude, props.location.coords.longitude], 12);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  radarLayer = L.tileLayer.wms('https://geo.weather.gc.ca/geomet?', {
      layers: 'RADAR_1KM_RRAI',
      version: '1.3.0',
      opacity: 0.5,
      attribution: "MSC GeoMet",
      transparent: true,
      format: 'image/png',
  }).addTo(map);

  // 15 minute refresh
  refreshInterval = window.setInterval(() => {
    if (radarLayer) radarLayer.redraw();
  }, 15 * 60 * 1000);
});

onUnmounted(() => {
  if (refreshInterval) clearInterval(refreshInterval);
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <div id="map" ref="mapContainer"></div>
</template>

<style scoped lang="scss">
#map {
  width: 100vw;
  height: calc(100% - $spacing-08);
}
</style>
