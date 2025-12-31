<script setup lang="ts">
const props =defineProps<{
  weatherData?: any
}>();
</script>

<template>
  <section v-if="weatherData !== null">
    <h4>NEXT 7 DAYS</h4>
    <div>
      <div class="dayInfo" v-for="day in weatherData.daily">
        <div id="dayInfoTime" class="secondary">{{ new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(day.time) }}</div>
        <div id="dayInfoTemp">{{ Math.round(day.tempMax) }}°/{{ Math.round(day.tempMin) }}°</div>
        <div id="dayInfoPrecip" class="dayInfoCell">
          <div class="primary">{{ day.precipChance }}%</div>
          <div class="dot secondary">•</div>
          <div class="secondary">{{ day.precipTotal.toFixed(2) }}in</div>
        </div>
        <div id="dayInfoWind" class="dayInfoCell">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            :style="{ transform: `rotate(${day.windDir + 180}deg)` }"
          >
            <path d="M12,2 L19,21 L12,17 L5,21 Z" />
          </svg>
          <div class="primary">{{ Math.round(day.windMax) }}</div>
          <div class="secondary">mph</div>
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
  z-index: 1;
  background-color: $layer-02;
  padding: $spacing-04;
  color: $text-primary;
}

.dayInfo {
  display: grid;
  grid-template-columns: 50px repeat(3, 1fr);
  align-items: center;
  padding: $spacing-03 $spacing-04;
  border-bottom: 1px solid $border-subtle-01;

  #dayInfoTemp {
    font-size: type-scale(3);
  }

  .dayInfoCell {
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
