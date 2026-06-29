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
      <WeatherMoon16Regular v-if="theme.dark" />
      <BrightnessHigh16Regular v-else />
    </n-icon>
  </n-button>
</template>

<style scoped>
.toggle {
  width: 38px;
  height: 38px;
  border: 1px solid var(--card-border) !important;
  background: var(--card-bg) !important;
  backdrop-filter: blur(12px) saturate(160%);
  -webkit-backdrop-filter: blur(12px) saturate(160%);
  box-shadow: 0 2px 12px var(--card-shadow);
  color: var(--icon-color) !important;
  transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease !important;
}

.toggle:hover {
  color: var(--icon-color-hover) !important;
  transform: scale(1.08);
  box-shadow: 0 4px 20px var(--card-shadow);
}

.toggle:active {
  transform: scale(0.94);
}
</style>
