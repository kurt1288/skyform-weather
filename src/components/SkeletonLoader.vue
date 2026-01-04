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

.skeleton {
  display: block;
  background-color: $layer-01;
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
      background: $layer-02;
      background-size: 200% 100%;
      animation: skeleton-scan 3s ease-in-out infinite;
      will-change: transform-origin,transform,opacity;
    }
  }
}

@keyframes skeleton-scan {
  0% {
      opacity:.3;
      transform:scaleX(0);
      transform-origin:left
    }
    20% {
      opacity:1;
      transform:scaleX(1);
      transform-origin:left
    }
    28% {
      transform:scaleX(1);
      transform-origin:right
    }
    51% {
      transform:scaleX(0);
      transform-origin:right
    }
    58% {
      transform:scaleX(0);
      transform-origin:right
    }
    82% {
      transform:scaleX(1);
      transform-origin:right
    }
    83% {
      transform:scaleX(1);
      transform-origin:left
    }
    96% {
      transform:scaleX(0);
      transform-origin:left
    }
    to {
      opacity:.3;
      transform:scaleX(0);
      transform-origin:left
    }
}
</style>
