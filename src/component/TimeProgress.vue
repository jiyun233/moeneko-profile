<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { getTimeProgress, type TimeProgress } from '@/utils/time'

const PROGRESS_ITEMS = [
  { key: 'day' as const, label: '今天' },
  { key: 'week' as const, label: '本周' },
  { key: 'month' as const, label: '本月' },
  { key: 'year' as const, label: '本年' },
]

const progress = ref<TimeProgress>(getTimeProgress())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    progress.value = getTimeProgress()
  }, 60000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="time-progress">
    <div
      v-for="item in PROGRESS_ITEMS"
      :key="item.key"
      class="progress-item"
    >
      <div class="progress-label">
        <span>{{ item.label }}</span>
        <span class="progress-pct">{{ progress[item.key].toFixed(1) }}%</span>
      </div>
      <n-progress
        type="line"
        :percentage="progress[item.key]"
        :height="3"
        :show-indicator="false"
        :border-radius="2"
        :color="'var(--text-tertiary)'"
        :rail-color="'var(--track-bg)'"
        class="progress-bar"
      />
    </div>
  </div>
</template>

<style scoped>
.time-progress {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 360px;
}

.progress-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.progress-label {
  display: flex;
  justify-content: space-between;
  font-size: clamp(0.65rem, 1vw, 0.75rem);
  color: var(--text-tertiary);
}

.progress-pct {
  font-variant-numeric: tabular-nums;
}

.progress-bar {
  width: 100%;
}
</style>
