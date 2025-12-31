<script setup lang="ts">
defineProps(['modelValue']);
defineEmits(['update:modelValue']);

import { ref } from 'vue';
</script>

<template>
  <div id="contentSwitcher">
    <button
      type="button"
      :class="{ active: modelValue === 'hourly' }"
      @click="$emit('update:modelValue', 'hourly')"
    >
        Hourly
      </button>
    <button
      type="button"
      :class="{ active: modelValue === 'daily' }"
      @click="$emit('update:modelValue', 'daily')"
    >
      Daily
    </button>
  </div>
</template>

<style scoped lang="scss">
#contentSwitcher {
  width: 100%;
  display: flex;
  margin: $spacing-04 0;

  button {
    font-size: type-scale(2);
    border-radius: 0;
    background-color: transparent;
    border: 1px solid $border-inverse;
    color: $text-secondary;
    padding: $spacing-03 $spacing-02;
    flex: 1;

    &.active {
      background-color: $layer-selected-inverse;
      color: $text-inverse;
    }

    &:hover {
      cursor: pointer;
    }

    &:first-child {
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>
