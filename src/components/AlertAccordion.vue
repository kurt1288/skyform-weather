<script setup lang="ts">
const props = defineProps<{
  alert?: any
}>();

import { ref } from 'vue';
const isOpen = ref(false);
</script>

<template>
  <div class="alert">
    <header
      @click="isOpen = !isOpen"
      :class="{ 'is-open': isOpen }"
    >
      <h2>{{ alert.event }}</h2>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        stroke-width="1.3"
        stroke-linecap="square"
        stroke-linejoin="miter"
        class="chevron"
      >
        <polyline points="3 6 8 11 13 6"></polyline>
      </svg>
    </header>
    <transition name="expand">
      <article v-show="isOpen">
        <div class="content-wrapper">
          <pre>{{ alert.description }}</pre>
        </div>
      </article>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.alert {
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacing-04 0;

    h2 {
      font-size: type-scale(4);
    }

    .chevron {
      transition: transform 70ms cubic-bezier(0.2, 0, 0.38, 0.9);
    }

    &.is-open {
      .chevron {
        transform: rotate(180deg);
      }
    }
  }

  article {
    overflow: hidden;
    transition: max-height 110ms cubic-bezier(0, 0, 0.38, 0.9);

    pre {
      text-wrap: wrap;
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: max-height 110ms cubic-bezier(0, 0, 0.38, 0.9);
  max-height: 500px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
}
</style>
