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
        <span class="primary">{{ Math.round(weatherData.daily[0].tempMax) }}°</span><span class="secondary">{{ Math.round(weatherData.daily[0].tempMin) }}°</span>
      </div>
      <div class="cell">
        <span class="primary">{{ weatherData.daily[0].precipChance }}<small>%</small></span>
        <span class="secondary">({{ weatherData.daily[0].precipTotal.toFixed(2) }}in)</span>
      </div>
      <div class="cell">
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
            <div>
              <span class="primary">{{ Math.round(weatherData.daily[0].windMax) }}<small>mph</small></span>
              <span class="secondary">(G{{ Math.round(weatherData.daily[0].gustMax) }})</span>
            </div>
          </div>
        </span>
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
  .primary {
    @include type-style('code-02');
    font-size: type-scale(3);
    margin-right: $spacing-02;

    small {
      @include type-style('body-compact-01');
      color: $text-secondary;
      font-size: type-scale(1);
      margin-left: $spacing-01;
    }
  }

  .secondary {
    color: $text-secondary;
    font-size: type-scale(1);
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
