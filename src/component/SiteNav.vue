<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const expanded = ref(false)
let isTouch = false

const siteLinks = [
  { label: '主页', url: '/' },
  { label: '博客', url: '/blog' },
  { label: '项目', url: '/projects' },
  { label: '关于', url: '/about' },
  { label: '友链', url: '/links' },
]

onMounted(() => {
  isTouch = !window.matchMedia('(hover: hover)').matches
})

function navigate(url: string) {
  if (url.startsWith('/')) {
    router.push(url)
  } else if (url.startsWith('http')) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
  // 移动端导航后自动收起
  if (isTouch) expanded.value = false
}

function onTriggerClick() {
  if (isTouch) expanded.value = !expanded.value
}

function onEnter() {
  if (!isTouch) expanded.value = true
}

function onLeave() {
  if (!isTouch) expanded.value = false
}
</script>

<template>
  <!-- 外层 wrapper 只负责居中定位, 不做动画, 保证生产/本地行为一致 -->
  <div
    class="site-nav-wrapper"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <nav
      class="site-nav"
      :class="{ expanded }"
    >
      <button
        class="nav-trigger"
        :aria-expanded="expanded"
        aria-label="切换导航菜单"
        @click="onTriggerClick"
      >
        <span class="hamburger" :class="{ open: expanded }">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
      <div class="nav-items">
        <button
          v-for="(link, i) in siteLinks"
          :key="link.label"
          class="nav-item"
          :style="{ '--item-index': i }"
          @click="navigate(link.url)"
        >
          {{ link.label }}
        </button>
      </div>
    </nav>
  </div>
</template>

<style scoped>
/* wrapper: 唯一职责 → 把导航固定到顶部居中, 永远不参与动画 */
.site-nav-wrapper {
  position: fixed;
  top: clamp(12px, 2.5vmin, 24px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  display: block;
}

/* 内层卡片: 只做视觉 + 扩大动画, 不参与定位 */
/* 展开时从水平中央向四周(除上) 同时扩大:
   顶边固定不动, 左右两侧对称外扩, 底边向下延伸 */
.site-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: 1px solid var(--card-border);
  border-radius: 10px;
  background-color: var(--footer-bg);
  backdrop-filter: blur(16px) saturate(110%);
  -webkit-backdrop-filter: blur(16px) saturate(110%);
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 16px 36px -22px var(--card-shadow);
  transform-origin: 50% 0; /* 水平中央 + 顶边为原点, 保证不向上扩大 */
  transform: scale(0.82, 0.78); /* 折叠态更小, 为扩大留出视觉空间 */
  opacity: 0.92;
  transition:
    padding var(--theme-duration) var(--theme-easing),
    transform var(--theme-duration) var(--theme-easing),
    opacity 0.35s ease,
    background-color var(--theme-duration) var(--theme-easing),
    border-color var(--theme-duration) var(--theme-easing),
    box-shadow var(--theme-duration) var(--theme-easing);
}

/* 展开态: 从中央向四周(除上) 放大至 1:1 实际尺寸 */
.site-nav.expanded {
  padding: 10px 20px;
  transform: scale(1, 1);
  opacity: 1;
  box-shadow:
    inset 0 1px 0 var(--card-inset-highlight),
    0 24px 56px -26px var(--card-shadow);
}

/* 触发器: 始终可见, 汉堡 ⇄ X */
.nav-trigger {
  flex-shrink: 0;
  width: 26px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--icon-color);
  transition: color var(--theme-duration) var(--theme-easing);
}

.nav-trigger:hover {
  color: var(--icon-color-hover);
}

.hamburger {
  position: relative;
  width: 14px;
  height: 10px;
}

.hamburger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 1px;
  transition: transform 0.3s var(--theme-easing), opacity 0.2s ease;
}

.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { top: 4px; }
.hamburger span:nth-child(3) { top: 8px; }

.hamburger.open span:nth-child(1) {
  transform: translateY(4px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-4px) rotate(-45deg);
}

/* 导航项容器: max-height 下拉展开, 内容淡入 */
.nav-items {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  max-height: 0;
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  transition:
    max-height var(--theme-duration) var(--theme-easing),
    max-width var(--theme-duration) var(--theme-easing),
    opacity 0.4s var(--theme-easing);
}

.site-nav.expanded .nav-items {
  max-height: 80px;
  max-width: 420px;
  opacity: 1;
}

/* 单个导航项: 从内侧(左右同时)涌入 + 淡入, 带回弹节奏 */
.nav-item {
  --item-index: 0; /* 默认值, 会被模板 :style 覆盖 */
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: var(--btn-text);
  font-size: clamp(0.78rem, 1.4vw, 0.88rem);
  padding: 5px 16px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  opacity: 0;
  transform: scale(0.5);
  transition:
    opacity 0.3s ease,
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
    background-color 0.2s ease,
    color 0.2s ease;
  transition-delay: calc(var(--item-index) * 55ms);
}

.site-nav.expanded .nav-item {
  opacity: 1;
  transform: scale(1);
}

.nav-item:hover {
  background: var(--btn-hover-bg);
  color: var(--btn-text-hover);
}

@media (max-width: 767px) {
  .site-nav {
    padding: 4px 10px;
  }

  .site-nav.expanded {
    padding: 9px 16px;
  }

  .site-nav.expanded .nav-items {
    max-width: 300px;
  }

  .nav-item {
    padding: 4px 12px;
    font-size: clamp(0.74rem, 1.2vw, 0.82rem);
  }
}

/* 横屏矮窗口: 更紧凑, 把空间留给内容 */
@media (orientation: landscape) and (max-height: 620px) {
  .site-nav-wrapper {
    top: clamp(10px, 2vmin, 18px);
  }

  .site-nav {
    padding: 3px 10px;
    gap: 2px;
  }

  .site-nav.expanded {
    padding: 7px 16px;
  }

  .site-nav.expanded .nav-items {
    max-width: 360px;
  }

  .nav-item {
    padding: 4px 12px;
  }
}
</style>
