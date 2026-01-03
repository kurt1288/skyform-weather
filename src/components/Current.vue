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
    </header>
    <section class="currentInfo">
      <div>
        <h2 class="currentTemp">{{ Math.round(weatherData.current.temperature_2m) }}°</h2>
        <div class="currentMore">
          <h3 class="currentCond">{{ weatherData.current.wmo }}</h3>
          <p class="feelsLike">Feels like {{ Math.round(weatherData.current.apparent_temperature) }}°</p>
        </div>
      </div>
      <div class="now">
        <div class="stack">
          <div class="row">
            <div class="cell">
              <label>Precip</label>
              <span class="value">{{ weatherData.current.precipitation.toFixed(2) }}<small>in</small></span>
            </div>
            <div class="cell">
              <label>Hum</label>
              <span class="value">{{ weatherData.current.relative_humidity_2m }}<small>%</small></span>
            </div>
          </div>
          <div class="row">
            <div class="cell">
              <label>Clouds</label>
              <span class="value">{{ weatherData.current.cloud_cover }}<small>%</small></span>
            </div>
            <div class="cell">
              <label>Wind</label>
              <div class="value windInfo">
                <svg
                  class="windArrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  :style="{ transform: `rotate(${weatherData.current.wind_direction_10m + 180}deg)` }"
                >
                  <path d="M12,2 L19,21 L12,17 L5,21 Z" />
                </svg>
                <span>{{ Math.round(weatherData.current.wind_speed_10m) }}</span>
                <small>mph</small>
                <small>(G{{ Math.round(weatherData.current.wind_gusts_10m) }})</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
.current {
  width: 100%;
  padding-top: $spacing-06;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $text-secondary;
  }

  .location, .time {
    @include type-style('code-01');
    font-weight: font-weight('light');
  }

  .currentInfo {
    display: flex;
    align-items: center;
    gap: $spacing-09;

    .now {
      width: 100%;

      .stack {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        gap: $spacing-04;
        margin-top: $spacing-05;

        .windInfo {
          display: flex;
          align-items: center;
        }

        .row {
          display: flex;
          gap: $spacing-02;

          .cell {
            flex: 1;
            display: flex;
            flex-direction: column;

            label {
              @include type-style('body-compact-02');
              color: $text-helper;
              font-size: type-scale(1);
              font-weight: font-weight('normal');
            }

            .value {
              @include type-style('code-02');
              font-weight: font-weight('normal');
              font-size: type-scale(3);

              .windArrow {
                color: $green-40;
                margin-right: $spacing-02;
              }

              small {
                @include type-style('body-compact-01');
                color: $text-secondary;
                font-size: type-scale(1);
                margin-left: $spacing-01;
              }
            }
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
