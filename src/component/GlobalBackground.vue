<script setup lang="ts">
import { inject } from 'vue'

const backgroundUrl = inject<string>('backgroundUrl', '')
</script>

<template>
  <div class="bg-layer">
    <div class="bg-image" :style="{ backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none' }" />
  </div>
</template>

<style scoped>
.bg-layer {
  z-index: -1;
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: var(--page-surface);
  transition: background-color var(--theme-duration) var(--theme-easing);
}

.bg-image,
.bg-layer::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.bg-image {
  inset: -4%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter:
    blur(3px)
    brightness(var(--bg-brightness))
    saturate(var(--bg-saturation))
    contrast(var(--bg-contrast));
  transform: scale(1.04);
  transition: filter var(--theme-duration) var(--theme-easing);
}

.bg-layer::after {
  inset: 0;
  background: var(--bg-overlay);
  transition: background-color var(--theme-duration) var(--theme-easing);
}
</style>
