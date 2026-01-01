<script setup lang="ts">
defineProps<{
  weatherData?: any
}>()
</script>

<template>
  <section class="currentDetails" v-if="weatherData !== null">
    <h4>TODAY</h4>
    <div class="currentDetailsGrid">
      <div class="cell">
        <span class="label">High/Low</span>
        <span class="value">{{ Math.round(weatherData.daily[0].tempMax) }}°/{{ Math.round(weatherData.daily[0].tempMin) }}°</span>
      </div>
      <div class="cell">
        <span class="label">Precip</span>
        <span class="value">{{ weatherData.daily[0].precipChance }}%/{{ weatherData.daily[0].precipTotal.toFixed(2) }}in</span>
      </div>
      <div class="cell">
        <span class="label">Wind</span>
        <span class="value">
          <div class="windInfo">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              :style="{ transform: `rotate(${weatherData.daily[0].windDir + 180}deg)` }"
            >
              <path d="M12,2 L19,21 L12,17 L5,21 Z" />
            </svg>
            <span>{{ Math.round(weatherData.daily[0].windMax) }}mph</span>
          </div>
        </span>
      </div>
      <div class="cell">
        <span class="label">Gusts</span>
        <span class="value">{{ Math.round(weatherData.daily[0].gustMax) }}mph</span>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.currentDetails {
  h4 {
    background-color: $layer-02;
    padding: $spacing-04;
    color: $text-primary;
  }

  .currentDetailsGrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: $spacing-04;
    background-color: $layer-01;
    padding: $spacing-03 $spacing-04;
  }
}

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
</style>
