<template>
  <footer class="site-footer">
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
  padding: 9px 16px;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--footer-bg);
  box-shadow: 0 16px 36px -22px var(--card-shadow);
  backdrop-filter: blur(16px) saturate(110%);
  -webkit-backdrop-filter: blur(16px) saturate(110%);
  text-align: center;
  transition:
    background-color var(--theme-duration) var(--theme-easing),
    box-shadow var(--theme-duration) var(--theme-easing);
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

.edgeone {
  color: var(--text-tertiary) !important;
  opacity: 0.72 !important;
}

@media (max-width: 767px) {
  .site-footer {
    max-width: calc(100% - 16px);
    padding: 8px 12px;
  }
}

/* 横屏矮窗口: 页脚更紧凑, 把空间留给内容 */
@media (orientation: landscape) and (max-height: 620px) {
  .site-footer {
    padding: 5px 14px;
    gap: 2px;
  }
}
</style>
