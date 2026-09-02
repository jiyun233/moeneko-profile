<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const expanded = ref(false)
let isTouch = false
let scrollHandler: (() => void) | null = null

const appVersion = __APP_VERSION__

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
    <p class="icp-row">
      <a href="https://icp.gov.moe" target="_blank" rel="noopener noreferrer">萌ICP备20269527号</a>
      <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">闽ICP备2026006101号-1</a>
    </p>
    <div class="meta-row">
      <span class="copyright">© 2026 Moe Jiyun233. All Rights Reserved.</span>
    </div>
    <p class="footer-sub">
      <span class="version-pill">#{{ appVersion }}</span>
      <span class="edgeone">· Site Secured &amp; Accelerated by Tencent Cloud EdgeOne · Pages · Security · CDN</span>
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0; /* 收缩态无间距, 保证只有 ICP 一行时它在 padding 正中 */
  width: clamp(280px, 60vw, 520px);
  max-width: calc(100% - 24px);
  margin: 0 auto clamp(10px, 2vmin, 16px);
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 6px 16px;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--footer-bg);
  backdrop-filter: blur(16px) saturate(110%);
  -webkit-backdrop-filter: blur(16px) saturate(110%);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 16px 36px -22px var(--card-shadow);
  transition:
    padding var(--theme-duration) var(--theme-easing),
    transform var(--theme-duration) var(--theme-easing),
    background-color var(--theme-duration) var(--theme-easing),
    border-color var(--theme-duration) var(--theme-easing),
    box-shadow var(--theme-duration) var(--theme-easing),
    gap var(--theme-duration) var(--theme-easing);
}

/* 展开态: 升起 + 投影加深 + 恢复行间间距 */
.site-footer.expanded {
  padding: 10px 20px;
  gap: 4px;
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 22px 48px -24px var(--card-shadow);
}

/* ICP 行: 不设 width:100%, 让盒子宽度 = 两链接+gap 的真实内容宽,
   再由父 footer 的 align-items:center 把这一整块精确放在卡片正中,
   避免"撑满 100% 再 justify-content:center"被两侧空留白稀释中心感 */
.icp-row {
  margin: 0;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(6px, 1.5vw, 14px);
  font-size: clamp(0.65rem, 0.8vw, 0.72rem);
  line-height: 1.5;
  color: var(--text-secondary);
  opacity: 0.9;
}

.icp-row a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.icp-row a:hover {
  opacity: 1;
  color: var(--text-primary);
}

.meta-row {
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(0.65rem, 0.8vw, 0.72rem);
  line-height: 1.5;
  color: var(--text-secondary);
}

.copyright {
  text-align: center;
  color: inherit;
  opacity: 0.76;
  min-width: 0;
  overflow-wrap: anywhere;
}

.version-pill {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.92em;
  padding: 1px 8px;
  border: 1px solid color-mix(in srgb, var(--card-border) 80%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--footer-bg) 60%, transparent);
  letter-spacing: 0.02em;
  color: inherit;
  opacity: 0.78;
  white-space: nowrap;
}

/* 第 3 行: 版本号 pill + EdgeOne 标语同一行居中, 用 · 间隔 */
.footer-sub {
  margin: 0;
  align-self: stretch;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 6px;
  font-size: calc(clamp(0.65rem, 0.8vw, 0.7rem) * 0.92);
  line-height: 1.5;
  color: var(--text-tertiary, var(--text-secondary));
  opacity: 0.72;
  transition: color var(--theme-duration) var(--theme-easing);
  overflow-wrap: anywhere;
}

.edgeone {
  text-align: center;
  color: inherit;
  opacity: 0.98;
}

.site-footer .meta-row,
.site-footer .footer-sub {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  transition:
    max-height var(--theme-duration) var(--theme-easing),
    opacity 0.4s var(--theme-easing),
    color var(--theme-duration) var(--theme-easing);
}

.site-footer.expanded .meta-row {
  max-height: 3.2em;
  opacity: 1;
  pointer-events: auto;
}

.site-footer.expanded .footer-sub {
  max-height: 2.6em;
  opacity: 0.7;
  pointer-events: auto;
}

@media (max-width: 767px) {
  .site-footer {
    width: auto;
    max-width: calc(100% - 16px);
    padding: 5px 12px;
    gap: 0;
  }

  .site-footer.expanded {
    padding: 9px 14px;
    gap: 3px;
  }

  .footer-sub {
    font-size: calc(clamp(0.65rem, 0.8vw, 0.7rem) * 0.88);
    gap: 4px;
  }
}

/* 横屏矮窗口: 更紧凑 */
@media (orientation: landscape) and (max-height: 620px) {
  .site-footer {
    padding: 4px 14px;
    gap: 0;
  }

  .site-footer.expanded {
    padding: 7px 16px;
    gap: 2px;
  }
}
</style>
