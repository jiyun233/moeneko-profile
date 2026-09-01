<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const expanded = ref(false)
let isTouch = false
let scrollHandler: (() => void) | null = null

onMounted(() => {
  isTouch = !window.matchMedia('(hover: hover)').matches

  if (isTouch) {
    scrollHandler = () => {
      const scrollY = window.scrollY
      const innerHeight = window.innerHeight
      const docHeight = document.documentElement.scrollHeight
      const distanceToBottom = docHeight - scrollY - innerHeight

      if (expanded.value) {
        if (distanceToBottom > 100) expanded.value = false
      } else {
        if (distanceToBottom <= 50) expanded.value = true
      }
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
    window.addEventListener('resize', scrollHandler)
    requestAnimationFrame(scrollHandler)
  }
})

function onEnter() {
  if (!isTouch) expanded.value = true
}

function onLeave() {
  if (!isTouch) expanded.value = false
}

onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
    window.removeEventListener('resize', scrollHandler)
  }
})
</script>

<template>
  <footer
    class="site-footer"
    :class="{ expanded }"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <p class="copyright">© 2026 Moe Jiyun233. All Rights Reserved.</p>
    <p class="icp">
      <a href="https://icp.gov.moe" target="_blank" rel="noopener noreferrer">萌ICP备20269527号</a>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">闽ICP备2026006101号-1</a>
    </p>
    <p class="edgeone">Site Secured & Accelerated by Tencent Cloud EdgeOne (Pages, Security, CDN)</p>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: max-content;
  max-width: calc(100% - 24px);
  margin: 0 auto clamp(10px, 2vmin, 16px);
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 5px 16px;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--footer-bg);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 16px 36px -22px var(--card-shadow);
  backdrop-filter: blur(16px) saturate(110%);
  -webkit-backdrop-filter: blur(16px) saturate(110%);
  text-align: center;
  transition:
    padding var(--theme-duration) var(--theme-easing),
    transform var(--theme-duration) var(--theme-easing),
    background-color var(--theme-duration) var(--theme-easing),
    border-color var(--theme-duration) var(--theme-easing),
    box-shadow var(--theme-duration) var(--theme-easing);
}

/* 展开态: 升起 + 投影加深 */
.site-footer.expanded {
  padding: 9px 16px;
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 22px 48px -24px var(--card-shadow);
}

.site-footer p {
  margin: 0;
  font-size: clamp(0.65rem, 0.8vw, 0.7rem);
  line-height: 1.5;
  color: var(--text-secondary);
  opacity: 0.76;
  transition: color var(--theme-duration) var(--theme-easing);
  overflow-wrap: anywhere;
}

/* 折叠态: 隐藏 copyright 与 edgeone, 仅保留 ICP 一条 */
.site-footer .copyright,
.site-footer .edgeone {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-height var(--theme-duration) var(--theme-easing),
    opacity 0.4s var(--theme-easing),
    color var(--theme-duration) var(--theme-easing);
}

/* 展开态: 内容淡入并恢复高度 */
.site-footer.expanded .copyright {
  max-height: 2.5em;
  opacity: 0.76;
}

.site-footer.expanded .edgeone {
  max-height: 2.5em;
  opacity: 0.72;
  color: var(--text-tertiary);
}

.icp {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(6px, 1.5vw, 14px);
}

.icp a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.icp a:hover {
  color: var(--text-secondary);
}

@media (max-width: 767px) {
  .site-footer {
    max-width: calc(100% - 16px);
    padding: 5px 12px;
  }

  .site-footer.expanded {
    padding: 8px 12px;
  }
}

/* 横屏矮窗口: 页脚更紧凑, 把空间留给内容 */
@media (orientation: landscape) and (max-height: 620px) {
  .site-footer {
    padding: 4px 14px;
    gap: 2px;
  }

  .site-footer.expanded {
    padding: 6px 14px;
  }
}
</style>
