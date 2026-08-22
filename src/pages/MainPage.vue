<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useNotification } from 'naive-ui'
import GlobalBackground from '@/component/GlobalBackground.vue'
import SiteInfo from '@/component/SiteInfo.vue'
import RandomQuote from '@/component/RandomQuote.vue'
import TimeDisplay from '@/component/TimeDisplay.vue'
import TimeProgress from '@/component/TimeProgress.vue'
import LinkBar from '@/component/LinkBar.vue'
import ThemeToggle from '@/component/ThemeToggle.vue'

const notification = useNotification()

onMounted(() => {
  document.body.style.overflow = 'hidden'
  document.oncontextmenu = () => {
    notification.create({
      title: '提示',
      content: '为了保证浏览体验, 本站禁止右键菜单',
      duration: 500,
      closable: false,
    })
    return false
  }
})

onUnmounted(() => {
  document.oncontextmenu = null
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="main-page">
    <GlobalBackground />
    <div class="overlay">
      <ThemeToggle class="theme-toggle" />
      <div class="grid">
        <div class="card profile">
          <SiteInfo />
        </div>
        <div class="card clock">
          <TimeDisplay />
        </div>
        <div class="card quote">
          <RandomQuote />
        </div>
        <div class="card progress">
          <TimeProgress />
        </div>
        <div class="card links">
          <LinkBar />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-page {
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.overlay {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  padding: clamp(16px, 3vmin, 32px);
  box-sizing: border-box;
  overflow-y: auto;
}

.theme-toggle {
  position: fixed;
  top: clamp(12px, 2.5vmin, 24px);
  right: clamp(12px, 2.5vmin, 24px);
  z-index: 10;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    'profile profile clock'
    'quote quote quote'
    'progress progress links';
  gap: clamp(14px, 2.5vmin, 22px);
  max-width: 900px;
  width: 100%;
  align-content: center;
}

.card {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background-color: var(--card-bg);
  backdrop-filter: blur(18px) saturate(110%);
  -webkit-backdrop-filter: blur(18px) saturate(110%);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  padding: clamp(20px, 3vmin, 28px);
  box-shadow: 0 18px 40px -28px var(--card-shadow);
  animation: card-in 0.55s ease-out both;
  display: flex;
  justify-content: center;
  transition:
    background-color var(--theme-duration) var(--theme-easing),
    transform 0.28s ease,
    box-shadow var(--theme-duration) var(--theme-easing),
    color var(--theme-duration) var(--theme-easing);
}

.card:hover {
  transform: translateY(-2px);
  border-color: var(--card-border-hover);
  box-shadow: 0 24px 48px -28px var(--card-shadow);
}

.profile {
  grid-area: profile;
  animation-delay: 0s;
}

.clock {
  grid-area: clock;
  animation-delay: 0.06s;
}

.quote {
  grid-area: quote;
  animation-delay: 0.12s;
}

.progress {
  grid-area: progress;
  animation-delay: 0.18s;
}

.links {
  grid-area: links;
  animation-delay: 0.24s;
}

@keyframes card-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto auto;
    grid-template-areas:
      'profile clock'
      'quote quote'
      'progress links';
    max-width: 640px;
  }
}

@media (max-width: 767px) {
  .overlay {
    align-items: flex-start;
    padding-top: 6vh;
    padding-bottom: 88px;
  }

  .theme-toggle {
    top: clamp(8px, 2vmin, 16px);
    right: clamp(8px, 2vmin, 16px);
  }

  .grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      'profile'
      'clock'
      'quote'
      'progress'
      'links';
    max-width: 420px;
    gap: clamp(12px, 2vmin, 18px);
  }

  .card {
    padding: clamp(16px, 2.5vmin, 22px);
    border-radius: 8px;
  }
}

@media (max-height: 600px) {
  .overlay {
    align-items: flex-start;
    padding-top: clamp(36px, 6vh, 48px);
    padding-bottom: 84px;
  }

  .grid {
    gap: clamp(8px, 2vh, 14px);
  }
}
</style>
