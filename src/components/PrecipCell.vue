<script setup lang="ts">
interface Props {
  chance: number;
  amount: number;
}

const props = defineProps<Props>();

import { computed } from 'vue';

const volumeWidth = computed(() => {
  if (props.amount === 0) return 0;
  // Square root scaling makes low-volume variations easier to see
  const width = Math.min((Math.sqrt(props.amount) * 80), 100);
  return Math.max(width, 5);
});
</script>

<template>
  <div class="precip">
    <div class="group">
      <div class="numbers">
        <span class="percent">{{ chance }}<small>%</small></span>
        <span class="amount">{{ amount === 0.00 ? 0 : amount }}<small>"</small></span>
      </div>
      <div class="chance">
        <div class="fill" :style="{ width: `${chance}%` }"></div>
      </div>
      <div class="volume">
        <div class="fill" :style="{ width: `${volumeWidth}%` }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.precip {
  height: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;

  .grid {
    display: grid;
    grid-template-columns: repeat(5, 5px);
    gap: 2px;

    .dot {
      width: 5px;
      height: 5px;
      background: $layer-accent-01;

      &.active {
        background: $blue-50;
        opacity: 0.6;
      }
    }
  }

  .group {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .numbers {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-03;
      font-size: type-scale(1);
    }

    .chance {
      height: 4px;
      overflow: hidden;

      .fill {
        height: 100%;
        background: green;
      }
    }

    .volume {
      height: 4px;
      overflow: hidden;

      .fill {
        height: 100%;
        background: $blue-50;
      }
    }
  }
}
</style>
