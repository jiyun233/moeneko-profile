<script setup lang="ts">
import { BrightnessHigh16Regular, WeatherMoon16Regular } from '@vicons/fluent'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <n-button
    circle
    class="toggle"
    :title="theme.dark ? '切换到亮色模式' : '切换到暗色模式'"
    @click="theme.toggle()"
  >
    <n-icon size="18">
      <Transition name="theme-icon" mode="out-in">
        <BrightnessHigh16Regular v-if="theme.dark" key="light" />
        <WeatherMoon16Regular v-else key="dark" />
      </Transition>
    </n-icon>
  </n-button>
</template>

<style scoped>
.toggle {
  width: 38px;
  height: 38px;
  border: 1px solid var(--card-border) !important;
  background-color: var(--card-bg) !important;
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  color: var(--icon-color) !important;
  transition:
    background-color var(--theme-duration) var(--theme-easing),
    border-color var(--theme-duration) var(--theme-easing),
    color var(--theme-duration) var(--theme-easing),
    transform 0.25s ease,
    box-shadow var(--theme-duration) var(--theme-easing) !important;
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 10px 24px -12px var(--card-shadow);
}

.toggle:hover {
  border-color: var(--card-border-hover) !important;
  color: var(--icon-color-hover) !important;
  transform: scale(1.08);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 4px 20px var(--card-shadow);
}

.toggle:active {
  transform: scale(0.94);
}
</style>
