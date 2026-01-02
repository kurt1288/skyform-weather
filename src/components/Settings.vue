<script setup lang="ts">
defineProps(['show']);
defineEmits(['close']);
</script>

<template>
  <Transition name="slide">
    <div v-if="show" class="drawer-overlay" @click.self="$emit('close')">
      <div class="drawer-panel">
        <div class="header">
          <button @click="$emit('close')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              viewBox="0 0 32 32"
              fill="currentColor"
              aria-hidden="true"
              style="flex-shrink: 0;"
            >
              <path d="M14 26l1.41-1.41L7.83 17H28v-2H7.83l7.58-7.59L14 6L4 16l10 10z" />
            </svg>
            <h2>Settings</h2>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.drawer-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  z-index: 1001;

  .drawer-panel {
    width: 100%;
    padding: 20px;
    background-color: $background;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;

      svg {
        display: block;
        padding-right: $spacing-03;
      }
    }
  }
}

.slide-enter-active, .slide-leave-active { transition: transform 0.15s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
