<script setup lang="ts">
import { computed } from 'vue';

type AnimationType = 'shimmer' | 'pulse' | 'none';
type ShapeType = 'text' | 'avatar' | 'rect' | 'heading';

interface Props {
  type?: ShapeType;
  width?: string;
  height?: string;
  animation?: AnimationType;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'rect',
  width: '100%',
  height: 'auto',
  animation: 'shimmer',
});

const customStyles = computed(() => {
  const defaultHeights: Record<ShapeType, string> = {
    text: '0.875rem',
    heading: '1.25rem',
    avatar: '48px',
    rect: '100%'
  };

  return {
    width: props.width,
    height: props.height === 'auto' ? defaultHeights[props.type] : props.height,
  };
});
</script>

<template>
  <div
    class="skeleton"
    :class="[type, animation]"
    :style="customStyles"
  ></div>
</template>

<style scoped lang="scss">
$skeleton-background: $layer-01;
$skeleton-shimmer: $layer-02;

.skeleton {
  display: block;
  background-color: $skeleton-background;
  position: relative;
  overflow: hidden;

  border-radius: 0;

  &.avatar {
    border-radius: 50%;
  }

  &.text, &.heading {
    margin-bottom: 0.5rem;
  }

  &.shimmer {
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        $skeleton-background 0%,
        $skeleton-shimmer 50%,
        $skeleton-background 100%
      );
      background-size: 200% 100%;
      animation: skeleton-scan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  }

  &.pulse {
    animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
}

@keyframes skeleton-scan {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
