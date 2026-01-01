<script setup lang="ts">
defineProps<{
  location?: string
  weatherData?: any
}>();

defineEmits(['open-settings']);

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
    <header>
      <div>
        <p class="location">{{ location }}</p>
        <p class="time">{{ formatStringDate(weatherData.current.time) }}</p>
      </div>
      <button @click="$emit('open-settings')">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            role="img"
            height="20px"
            width="20px"
          >
            <path
              fill="currentColor"
              d="M27,16.76c0-.25,0-.5,0-.76s0-.51,0-.77l1.92-1.68A2,2,0,0,0,29.3,11L26.94,7a2,2,0,0,0-1.73-1,2,2,0,0,0-.64.1l-2.43.82a11.35,11.35,0,0,0-1.31-.75l-.51-2.52a2,2,0,0,0-2-1.61H13.64a2,2,0,0,0-2,1.61l-.51,2.52a11.48,11.48,0,0,0-1.32.75L7.43,6.06A2,2,0,0,0,6.79,6,2,2,0,0,0,5.06,7L2.7,11a2,2,0,0,0,.41,2.51L5,15.24c0,.25,0,.5,0,.76s0,.51,0,.77L3.11,18.45A2,2,0,0,0,2.7,21L5.06,25a2,2,0,0,0,1.73,1,2,2,0,0,0,.64-.1l2.43-.82a11.35,11.35,0,0,0,1.31.75l.51,2.52a2,2,0,0,0,2,1.61h4.72a2,2,0,0,0,2-1.61l.51-2.52a11.48,11.48,0,0,0,1.32-.75l2.42.82a2,2,0,0,0,.64.1,2,2,0,0,0,1.73-1L29.3,21a2,2,0,0,0-.41-2.51ZM25.21,24l-3.43-1.16a8.86,8.86,0,0,1-2.71,1.57L18.36,28H13.64l-.71-3.55a9.36,9.36,0,0,1-2.7-1.57L6.79,24,4.43,20l2.72-2.4a8.9,8.9,0,0,1,0-3.13L4.43,12,6.79,8l3.43,1.16a8.86,8.86,0,0,1,2.71-1.57L13.64,4h4.72l.71,3.55a9.36,9.36,0,0,1,2.7,1.57L25.21,8,27.57,12l-2.72,2.4a8.9,8.9,0,0,1,0,3.13L27.57,20Z"
            />
            <path
              fill="currentColor"
              d="M16,22a6,6,0,1,1,6-6A5.94,5.94,0,0,1,16,22Zm0-10a3.91,3.91,0,0,0-4,4,3.91,3.91,0,0,0,4,4,3.91,3.91,0,0,0,4-4A3.91,3.91,0,0,0,16,12Z"
            />
          </svg>
      </button>
    </header>
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
          <p class="value">{{ weatherData.current.precipitation.toFixed(2) }}in</p>
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

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $text-secondary;

    button {
      background-color: transparent;
      border: none;
      color: $text-secondary;
      cursor: pointer;
    }
  }

  .location, .time {
    @include type-style('code-01');
    font-weight: font-weight('light');
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
