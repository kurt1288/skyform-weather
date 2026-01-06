<script setup lang="ts">
import { computed } from 'vue';
import PrecipCell from './PrecipCell.vue';

const props =defineProps<{
  weatherData?: any
}>();

const formatTime = (time: Date) => {
  const formatted = time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });

  const [value, period] = formatted.split(/\s+/);

  return { value, period };
}

const minTemp = computed(() => Math.min(...props.weatherData.hourly.map((hour: any) => hour.temp)));
const maxTemp = computed(() => Math.max(...props.weatherData.hourly.map((hour: any) => hour.temp)));

const getWidth = (t: number) => {
  if (maxTemp.value === minTemp.value) return '50%';

  const padding = 1;
  const paddedMin = minTemp.value - padding;
  const paddedMax = maxTemp.value + padding;

  const virtualMin = paddedMin - (paddedMax - paddedMin) * 0.1;
  const percentage = ((t - virtualMin) / (paddedMax - virtualMin)) * 100;
  return `${Math.min(100, Math.max(0, percentage))}%`;
};
</script>

<template>
  <section v-if="weatherData !== null">
    <h4>NEXT 24 HOURS</h4>
    <div>
      <div class="hourInfo" v-for="hour in weatherData.hourly">
        <div class="secondary">
          <span>{{ formatTime(hour.time).value }}</span>
          <span class="value">{{ formatTime(hour.time).period }}</span>
        </div>
        <div id="hourInfoTemp">
          <div class="value">{{ Math.round(hour.temp) }}°</div>
          <div class="bar">
            <div class="fill" :style="{ width: getWidth(Math.round(hour.temp)) }"></div>
          </div>
        </div>
        <div id="hourInfoClouds">
          <span class="value">{{ hour.clouds }}<small>%</small></span>
          <div class="bar">
            <div class="fill" :style="{ width: `${hour.clouds}%` }"></div>
          </div>
        </div>
        <div id="hourInfoPrecip" class="hourlyInfoCell">
          <PrecipCell
            :chance="hour.precipProb"
            :amount="Number(hour.precip.toFixed(2))"
          />
        </div>
        <div id="hourInfoWind" class="hourlyInfoCell">
          <div class="value">{{ Math.round(hour.windSpeed) }}</div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{ transform: `rotate(${hour.windDir + 180}deg)` }"
          >
            <path d="M12,2 L19,21 L12,17 L5,21 Z" />
          </svg>
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
  grid-template-columns: 35px 1fr 1fr 1fr 45px;
  align-items: center;
  padding: $spacing-04 $spacing-04;
  border-bottom: 1px solid $border-subtle-01;
  gap: $spacing-05;

  .secondary {
    color: $text-secondary;
    font-size: type-scale(1);

    .value {
      font-size: type-scale(1);
    }
  }

  .value {
    font-size: type-scale(3);

    small {
      @include type-style('body-compact-01');
      color: $text-secondary;
      font-size: type-scale(1);
      margin-left: $spacing-01;
    }
  }

  #hourInfoTemp,
  #hourInfoClouds {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .bar {
      height: 4px;
      overflow: hidden;

      .fill {
        height: 100%;
      }
    }

    .value {
      width: 100%;
      text-align: center;
      margin-bottom: $spacing-02;
    }
  }

  #hourInfoTemp .bar .fill {
    background-color: $blue-50;
  }

  #hourInfoClouds .bar .fill {
    background-color: $gray-50;
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

  svg {
    color: $green-40;
  }
}
</style>
