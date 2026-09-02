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
    <div class="footer-grid">
      <span class="copyright">© 2026 Moe Jiyun233. All Rights Reserved.</span>
      <span class="icp">
        <a href="https://icp.gov.moe" target="_blank" rel="noopener noreferrer">萌ICP备20269527号</a>
        <a href="https://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer">闽ICP备2026006101号-1</a>
      </span>
      <span class="version-pill">#{{ appVersion }}</span>
    </div>
    <p class="footer-sub">
      Site Secured &amp; Accelerated by Tencent Cloud EdgeOne · Pages · Security · CDN
    </p>
  </footer>
</template>

<style scoped>
/* 与 SiteNav 对称的同款玻璃卡片 */
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

/* 展开态: 升起 + 投影加深 (与 SiteNav 方向对称) */
.site-footer.expanded {
  padding: 10px 22px;
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 22px 48px -24px var(--card-shadow);
}

/* 主行: 三列分栏 (版权 / ICP 主信息 / 版本号) */
.footer-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: clamp(8px, 2vw, 20px);
  width: 100%;
  font-size: clamp(0.65rem, 0.8vw, 0.72rem);
  line-height: 1.5;
  color: var(--text-secondary);
}

/* 版权 (左列) */
.copyright {
  justify-self: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  color: inherit;
  opacity: 0.76;
}

/* ICP (中列) */
.icp {
  justify-self: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: clamp(6px, 1.5vw, 14px);
  color: inherit;
  opacity: 0.88; /* ICP 是主信息, 比版权/版本号更亮一点 */
}

.icp a {
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease, opacity 0.2s ease;
}

.icp a:hover {
  opacity: 1;
  color: var(--text-primary);
}

/* 版本号 (右列): 小 pill, 等宽, 工程风 */
.version-pill {
  justify-self: end;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
  padding: 2px 8px;
  border: 1px solid color-mix(in srgb, var(--card-border) 80%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--footer-bg) 60%, transparent);
  letter-spacing: 0.02em;
  color: inherit;
  opacity: 0.72;
}

/* 次行: EdgeOne 标语 */
.footer-sub {
  margin: 0;
  font-size: calc(clamp(0.65rem, 0.8vw, 0.7rem) * 0.92);
  line-height: 1.5;
  color: var(--text-tertiary, var(--text-secondary));
  text-align: center;
  opacity: 0.72;
  transition: color var(--theme-duration) var(--theme-easing);
  overflow-wrap: anywhere;
}

/* 折叠态: 隐藏版权 / 版本号 / 次行, 只保留 ICP (三列网格仍工作) */
.site-footer .copyright,
.site-footer .version-pill,
.site-footer .footer-sub {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
  transition:
    max-height var(--theme-duration) var(--theme-easing),
    opacity 0.4s var(--theme-easing),
    color var(--theme-duration) var(--theme-easing),
    padding 0.25s var(--theme-easing),
    border-color 0.25s var(--theme-easing);
}

/* 展开态: 版权恢复 */
.site-footer.expanded .copyright {
  max-height: 2.5em;
  opacity: 0.76;
  pointer-events: auto;
}

/* 展开态: 版本号 pill 恢复 */
.site-footer.expanded .version-pill {
  max-height: 2.2em;
  opacity: 0.72;
  pointer-events: auto;
}

/* 展开态: 次行 EdgeOne 恢复 */
.site-footer.expanded .footer-sub {
  max-height: 2.5em;
  opacity: 0.7;
  pointer-events: auto;
}

/* 窄屏: 三列变两行 → ICP 单独一行居中, 版权+版本号一行两端 */
@media (max-width: 767px) {
  .site-footer {
    width: auto;
    max-width: calc(100% - 16px);
    padding: 5px 14px;
  }

  .site-footer.expanded {
    padding: 9px 16px;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "icp     icp"
      "copy    ver";
    gap: 4px;
  }

  .copyright {
    grid-area: copy;
    justify-self: start;
    font-size: 0.95em;
  }

  .icp {
    grid-area: icp;
    justify-self: center;
  }

  .version-pill {
    grid-area: ver;
    justify-self: end;
  }

  .footer-sub {
    font-size: calc(clamp(0.65rem, 0.8vw, 0.7rem) * 0.88);
  }
}

/* 横屏矮窗口: 更紧凑 */
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
