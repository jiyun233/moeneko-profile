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
      <span class="version-pill">#{{ appVersion }}</span>
    </div>
    <p class="footer-sub">
      Site Secured &amp; Accelerated by Tencent Cloud EdgeOne · Pages · Security · CDN
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: clamp(320px, 78vw, 680px);
  max-width: calc(100% - 24px);
  margin: 0 auto clamp(10px, 2vmin, 16px);
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 6px 18px;
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
    box-shadow var(--theme-duration) var(--theme-easing);
}

.site-footer.expanded {
  padding: 10px 22px;
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 22px 48px -24px var(--card-shadow);
}

.icp-row {
  margin: 0;
  width: 100%;
  display: flex;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  font-size: clamp(0.65rem, 0.8vw, 0.72rem);
  line-height: 1.5;
  color: var(--text-secondary);
}

.copyright {
  text-align: left;
  color: inherit;
  opacity: 0.76;
  min-width: 0;
  overflow-wrap: anywhere;
  hyphens: auto;
}

.version-pill {
  flex-shrink: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.92em;
  padding: 2px 8px;
  border: 1px solid color-mix(in srgb, var(--card-border) 80%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--footer-bg) 60%, transparent);
  letter-spacing: 0.02em;
  color: inherit;
  opacity: 0.74;
  white-space: nowrap;
}

.footer-sub {
  margin: 0;
  width: 100%;
  font-size: calc(clamp(0.65rem, 0.8vw, 0.7rem) * 0.92);
  line-height: 1.5;
  color: var(--text-tertiary, var(--text-secondary));
  text-align: center;
  opacity: 0.72;
  transition: color var(--theme-duration) var(--theme-easing);
  overflow-wrap: anywhere;
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
    padding: 5px 14px;
    gap: 3px;
  }

  .site-footer.expanded {
    padding: 9px 16px;
  }

  .meta-row {
    align-items: flex-start;
    gap: 8px;
  }

  .version-pill {
    align-self: flex-start;
  }

  .footer-sub {
    font-size: calc(clamp(0.65rem, 0.8vw, 0.7rem) * 0.88);
  }
}

@media (orientation: landscape) and (max-height: 620px) {
  .site-footer {
    padding: 4px 16px;
    gap: 2px;
  }

  .site-footer.expanded {
    padding: 7px 18px;
  }
}
</style>
