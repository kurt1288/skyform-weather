<script setup lang="ts">
const props =defineProps<{
  weatherData?: any
}>();

const formatTime = (time: Date) => {
  if (!time) return "";

  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}
</script>

<template>
  <section v-if="weatherData !== null">
    <h4>NEXT 24 HOURS</h4>
    <div>
      <div class="hourInfo" v-for="hour in weatherData.hourly">
        <div id="hourInfoTime" class="secondary">{{ formatTime(hour.time) }}</div>
        <div id="hourInfoTemp">{{ Math.round(hour.temp) }}°</div>
        <div id="hourInfoPrecip" class="hourlyInfoCell">
          <div class="primary">{{ hour.precipProb }}%</div>
          <div class="dot secondary">•</div>
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
          <div class="primary">{{ Math.round(hour.windSpeed) }}</div>
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

.hourInfo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding: $spacing-03 $spacing-04;
  border-bottom: 1px solid $border-subtle-01;

  #hourInfoTemp {
    font-size: type-scale(3);
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
