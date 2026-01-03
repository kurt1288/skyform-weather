<script setup lang="ts">
import { computed } from 'vue';

const props =defineProps<{
  weatherData?: any
}>();

const formatTime = (time: Date) => {
  if (!time) return "";

  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true
  });
}

const padding = 5;
const minTemp = computed(() => Math.min(...props.weatherData.hourly.map((hour: any) => hour.temp)) - padding);
const maxTemp = computed(() => Math.max(...props.weatherData.hourly.map((hour: any) => hour.temp)) + padding);

const getWidth = (t: number) => {
  if (maxTemp.value === minTemp.value) return '50%';

  const percentage = ((t - minTemp.value) / (maxTemp.value - minTemp.value)) * 100;
  return `${percentage}%`;
};
</script>

<template>
  <section v-if="weatherData !== null">
    <h4>NEXT 24 HOURS</h4>
    <div>
      <div class="hourInfo" v-for="hour in weatherData.hourly">
        <div class="secondary">{{ formatTime(hour.time) }}</div>
        <div id="hourInfoTemp">
          <div class="value">{{ Math.round(hour.temp) }}°</div>
          <div
            class="bar"
            :style="{ width: getWidth(Math.round(hour.temp)) }"
          ></div>
        </div>
        <div id="hourInfoClouds">
          <span class="value">{{ hour.clouds }}<small>%</small></span>
        </div>
        <div id="hourInfoPrecip" class="hourlyInfoCell">
          <div class="value">{{ hour.precipProb }}<small>%</small></div>
          <div class="secondary">{{ hour.precip.toFixed(2) }}in</div>
        </div>
        <div id="hourInfoWind" class="hourlyInfoCell">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{ transform: `rotate(${hour.windDir + 180}deg)` }"
          >
            <path d="M12,2 L19,21 L12,17 L5,21 Z" />
          </svg>
          <div class="value">{{ Math.round(hour.windSpeed) }}<small>mph</small></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  background-color: $layer-01;
}

h4 {
  position: sticky;
  top: 0;
  z-index: 3;
  background-color: $layer-02;
  padding: $spacing-04;
  color: $text-primary;
}

.hourInfo {
  display: grid;
  grid-template-columns: 60px repeat(4, 1fr);
  align-items: center;
  padding: $spacing-03 $spacing-04;
  border-bottom: 1px solid $border-subtle-01;

  .value {
    font-size: type-scale(3);

    small {
      @include type-style('body-compact-01');
      color: $text-secondary;
      font-size: type-scale(1);
      margin-left: $spacing-01;
    }
  }

  #hourInfoTemp {
    font-size: type-scale(3);
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .bar {
      height: 2px;
      background-color: $blue-50;
      margin-bottom: $spacing-02;
    }

    .value {
      width: 100%;
      text-align: center;
    }
  }

  #hourInfoClouds {
    text-align: right;
  }

  #hourInfoPrecip {
    flex-direction: column;
    align-items: end;
  }

  .hourlyInfoCell {
    display: flex;
    align-items: center;
    justify-content: right;
  }

  .dot {
    padding: 0 $spacing-02;
  }

  .secondary {
    color: $text-secondary;
    font-size: type-scale(1);
  }

  svg {
    color: $green-40;
    margin-right: $spacing-02;
  }
}
</style>
