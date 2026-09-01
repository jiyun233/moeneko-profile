<script setup lang="ts">
import { useRouter } from 'vue-router'
import GlobalBackground from '@/component/GlobalBackground.vue'

const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="not-found-page">
    <GlobalBackground />
    <div class="overlay">
      <div class="card">
        <div class="code">404</div>
        <div class="message">页面未找到</div>
        <div class="hint">前面的区域, 以后再来探索吧</div>
        <n-button secondary round class="home-btn" @click="goHome">
          返回首页
        </n-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
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
  justify-content: center;
  padding: clamp(16px, 3vmin, 32px);
  padding-top: max(clamp(16px, 3vmin, 32px), 64px);
  padding-bottom: max(clamp(16px, 3vmin, 32px), 48px);
  box-sizing: border-box;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(12px, 2vmin, 20px);
  margin: auto;
  padding: clamp(28px, 5vmin, 56px) clamp(24px, 6vw, 56px);
  border-radius: 24px;
  background: var(--card-bg);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid var(--card-border);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 8px 40px var(--card-shadow);
  animation: card-in 0.6s ease-out both;
  transition:
    background-color var(--theme-duration) var(--theme-easing),
    border-color var(--theme-duration) var(--theme-easing),
    box-shadow var(--theme-duration) var(--theme-easing),
    color var(--theme-duration) var(--theme-easing);
}

.code {
  font-size: clamp(5rem, 15vw, 8rem);
  font-weight: 200;
  color: var(--text-primary);
  line-height: 1;
  letter-spacing: 0.04em;
  text-shadow: 0 4px 32px var(--text-shadow-color);
  user-select: none;
}

.message {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  font-weight: 400;
  user-select: none;
}

.hint {
  font-size: clamp(0.75rem, 1.4vw, 0.9rem);
  color: var(--text-tertiary);
  user-select: none;
}

.home-btn {
  margin-top: 4px;
  color: var(--btn-text) !important;
  border-color: var(--btn-border) !important;
}

.home-btn:hover {
  color: var(--btn-text-hover) !important;
}

@keyframes card-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
