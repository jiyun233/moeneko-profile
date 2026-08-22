<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { formatDate, formatTime } from '@/utils/time'

const time = ref(formatTime(new Date()))
const date = ref(formatDate(new Date()))
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    const now = new Date()
    time.value = formatTime(now)
    date.value = formatDate(now)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<template>
  <div class="time-display">
    <div class="time-clock">{{ time }}</div>
    <div class="time-date">{{ date }}</div>
  </div>
</template>

<style scoped>
.time-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.time-clock {
  font-size: clamp(2.4rem, 7vw, 4.2rem);
  font-weight: 300;
  color: var(--text-primary);
  letter-spacing: 0;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 2px 20px var(--text-shadow-color);
  user-select: none;
  transition: color var(--theme-duration) var(--theme-easing), text-shadow var(--theme-duration) var(--theme-easing);
}

.time-date {
  font-size: clamp(0.75rem, 1.3vw, 0.92rem);
  color: var(--text-tertiary);
  letter-spacing: 0;
  user-select: none;
  transition: color var(--theme-duration) var(--theme-easing);
}
</style>
