<script setup lang="ts">
const props = defineProps<{
  alerts?: any
}>();

import AlertAccordion from './AlertAccordion.vue';
</script>

<template>
  <div class="alerts">
    <AlertAccordion
      v-for="alert in alerts"
      :key="alert.id"
      :alert="alert"
    />
  </div>
</template>

<style scoped lang="scss">
.alerts {
  background-color: $yellow-10;
  border-left: 3px solid $yellow-30;
  padding: 0 $spacing-04;
  color: $text-inverse;
  margin-bottom: $spacing-05;
}
</style>
