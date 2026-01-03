<script setup lang="ts">
defineEmits(['viewChange', 'open-settings']);
</script>

<template>
  <footer>
    <div class="footer">
      <button type="button" @click="$emit('viewChange', 'forecast')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path
            d="M26,4H22V2H20V4H12V2H10V4H6A2.0025,2.0025,0,0,0,4,6V26a2.0025,2.0025,0,0,0,2,2H26a2.0025,2.0025,0,0,0,2-2V6A2.0025,2.0025,0,0,0,26,4ZM6,6h4V8h2V6h8V8h2V6h4l0,4H6Zm0,6h5v6H6ZM19,26H13V20h6Zm0-8H13V12h6Zm2,8V20h5l.0012,6Z"/>
          <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
        </svg>
        <p>Forecast</p>
      </button>
      <button type="button" @click="$emit('viewChange', 'radar')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path
            d="M30,3.4141,28.5859,2,15.293,15.293a1,1,0,0,0,1.414,1.414l4.18-4.1792A5.9956,5.9956,0,1,1,16,10V8a8.011,8.011,0,1,0,6.3164,3.0977L25.1631,8.251A11.881,11.881,0,0,1,28,16,12,12,0,1,1,16,4V2A14,14,0,1,0,30,16a13.8572,13.8572,0,0,0-3.4224-9.1636Z"
            transform="translate(0 0)
          "/>
          <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
        </svg>
        <p>Radar</p>
      </button>
      <button type="button" @click="$emit('open-settings')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="25"
          height="25"
          fill="currentColor"
        >
          <path
            d="M27,16.76c0-.25,0-.5,0-.76s0-.51,0-.77l1.92-1.68A2,2,0,0,0,29.3,11L26.94,7a2,2,0,0,0-1.73-1,2,2,0,0,0-.64.1l-2.43.82a11.35,11.35,0,0,0-1.31-.75l-.51-2.52a2,2,0,0,0-2-1.61H13.64a2,2,0,0,0-2,1.61l-.51,2.52a11.48,11.48,0,0,0-1.32.75L7.43,6.06A2,2,0,0,0,6.79,6,2,2,0,0,0,5.06,7L2.7,11a2,2,0,0,0,.41,2.51L5,15.24c0,.25,0,.5,0,.76s0,.51,0,.77L3.11,18.45A2,2,0,0,0,2.7,21L5.06,25a2,2,0,0,0,1.73,1,2,2,0,0,0,.64-.1l2.43-.82a11.35,11.35,0,0,0,1.31.75l.51,2.52a2,2,0,0,0,2,1.61h4.72a2,2,0,0,0,2-1.61l.51-2.52a11.48,11.48,0,0,0,1.32-.75l2.42.82a2,2,0,0,0,.64.1,2,2,0,0,0,1.73-1L29.3,21a2,2,0,0,0-.41-2.51ZM25.21,24l-3.43-1.16a8.86,8.86,0,0,1-2.71,1.57L18.36,28H13.64l-.71-3.55a9.36,9.36,0,0,1-2.7-1.57L6.79,24,4.43,20l2.72-2.4a8.9,8.9,0,0,1,0-3.13L4.43,12,6.79,8l3.43,1.16a8.86,8.86,0,0,1,2.71-1.57L13.64,4h4.72l.71,3.55a9.36,9.36,0,0,1,2.7,1.57L25.21,8,27.57,12l-2.72,2.4a8.9,8.9,0,0,1,0,3.13L27.57,20Z" transform="translate(0 0)"/><path d="M16,22a6,6,0,1,1,6-6A5.94,5.94,0,0,1,16,22Zm0-10a3.91,3.91,0,0,0-4,4,3.91,3.91,0,0,0,4,4,3.91,3.91,0,0,0,4-4A3.91,3.91,0,0,0,16,12Z"
            transform="translate(0 0)"
          />
        </svg>
        <p>Settings</p>
      </button>
    </div>
  </footer>
</template>

<style scoped lang="scss">
footer {
  background-color: $background;
  border-top: 1px solid $border-subtle-01;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  z-index: 1001;

  .footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $spacing-05;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-02 0;
    height: $spacing-09;
    width: $spacing-10;
    font-size: type-scale(1);
  }

  .cls-1 {
    fill: none;
  }
}
</style>
