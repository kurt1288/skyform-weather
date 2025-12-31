<script setup lang="ts">
defineProps<{
  location?: string
  weatherData?: any
}>();

const formatStringDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format((Number(date) * 1000)).replace(',', '');
};
</script>

<template>
  <section class="current" v-if="weatherData !== null">
    <p class="location">{{ location }}</p>
    <p class="time">{{ formatStringDate(weatherData.current.time) }}</p>
    <section class="currentInfo">
      <div>
        <h2 class="currentTemp">{{ Math.round(weatherData.current.temperature_2m) }}°</h2>
        <div class="currentMore">
          <h3 class="currentCond">{{ weatherData.current.wmo }}</h3>
          <p class="feelsLike">Feels like {{ Math.round(weatherData.current.apparent_temperature) }}°</p>
        </div>
      </div>
      <div class="today">
        <div class="cell">
          <p class="label">Clouds</p>
          <p class="value">{{ weatherData.current.cloud_cover }}%</p>
        </div>
        <div class="cell">
          <p class="label">Precip</p>
          <p class="value">{{ weatherData.current.precipitation }}in</p>
        </div>
        <div class="cell">
          <p class="label">Hum</p>
          <p class="value">{{ weatherData.current.relative_humidity_2m }}%</p>
        </div>
        <div class="cell">
          <p class="label">Wind</p>
          <p class="value windInfo">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              :style="{ transform: `rotate(${weatherData.current.wind_direction_10m + 180}deg)` }"
            >
              <path d="M12,2 L19,21 L12,17 L5,21 Z" />
            </svg>
            <span>{{ Math.round(weatherData.current.wind_speed_10m) }}mph</span>
          </p>
        </div>
        <div class="cell">
          <p class="label">Gusts</p>
          <p class="value">{{ Math.round(weatherData.current.wind_gusts_10m) }}mph</p>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
.current {
  width: 100%;

  .location, .time {
    @include type-style('code-01');
    font-weight: font-weight('light');
    color: $text-secondary;
  }

  .currentInfo {
    display: flex;
    align-items: center;
    gap: $spacing-09;

    .today {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: $spacing-04;
      margin-top: $spacing-05;

      .cell {
        display: flex;
        flex-direction: column;

        .label {
          color: $text-secondary;
          font-size: type-scale(1);
        }

        .value {
          @include type-style('code-02');
          font-weight: font-weight('semibold');
        }

        .windInfo {
          display: flex;
          align-items: center;
          gap: $spacing-02;

          svg {
            transform-origin: center;
            display: inline-block;
            color: $green-40;
          }
        }
      }
    }

    .currentMore {
      border-left: 2px solid $blue-50;
      padding-left: $spacing-04;

      .currentCond {
        font-size: type-scale(4);
        margin-bottom: $spacing-02;
      }

      .feelsLike {
        color: $text-secondary;
        font-size: type-scale(2);
      }
    }

    .currentTemp {
      font-size: type-scale(15);
      font-weight: font-weight('light');
    }
  }
}
</style>
