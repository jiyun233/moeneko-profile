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
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.overlay {
  flex: 1;
  display: flex;
  padding: clamp(16px, 3vmin, 32px);
  /* 顶部留出悬浮主题切换按钮的空间, 防止遮挡首张卡片 */
  padding-top: max(clamp(16px, 3vmin, 32px), 64px);
  padding-bottom: max(clamp(16px, 3vmin, 32px), 48px);
  box-sizing: border-box;
}

.theme-toggle {
  position: fixed;
  top: clamp(12px, 2.5vmin, 24px);
  right: clamp(12px, 2.5vmin, 24px);
  z-index: 10;
}

/* 用 margin: auto 居中: 内容超出视口时可以自然滚动, 不会被裁剪 */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'profile'
    'clock'
    'quote'
    'progress'
    'links';
  gap: clamp(12px, 2.5vmin, 20px);
  width: 100%;
  max-width: 480px;
  margin: auto;
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
  padding: clamp(16px, 3vmin, 28px);
  box-shadow: 0 18px 40px -28px var(--card-shadow);
  animation: card-in 0.55s ease-out both;
  display: flex;
  justify-content: center;
  min-width: 0;
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

/* 平板 / 横屏手机: 双列 */
@media (min-width: 640px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'profile clock'
      'quote quote'
      'progress links';
    max-width: 680px;
  }
}

/* 桌面: 三列 */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'profile profile clock'
      'quote quote quote'
      'progress progress links';
    max-width: 920px;
    gap: clamp(14px, 2.5vmin, 22px);
  }
}

/* 横屏手机 / 高度不足的窗口: 紧凑间距, 尽量一屏放下 */
@media (orientation: landscape) and (max-height: 620px) {
  .overlay {
    padding-top: max(clamp(12px, 2vmin, 24px), 52px);
    padding-bottom: max(clamp(12px, 2vmin, 24px), 24px);
  }

  .grid {
    gap: clamp(8px, 2vmin, 14px);
  }

  .card {
    padding: clamp(12px, 2.5vmin, 20px);
  }
}

/* 横屏矮窗口, 中等宽度: 保持两列 */
@media (orientation: landscape) and (max-height: 620px) and (min-width: 480px) and (max-width: 719.98px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'profile clock'
      'quote quote'
      'progress links';
    max-width: 680px;
  }
}

/* 横屏矮窗口, 宽度充足: 紧凑三列两行, 避免滚动 */
@media (orientation: landscape) and (max-height: 620px) and (min-width: 720px) {
  .grid {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      'profile clock quote'
      'progress progress links';
    max-width: 920px;
  }
}
</style>
