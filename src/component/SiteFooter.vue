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
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: clamp(6px, 1.5vh, 12px) clamp(8px, 2vw, 20px);
  text-align: center;
}

.site-footer p {
  margin: 0;
  font-size: clamp(0.55rem, 0.9vw, 0.68rem);
  line-height: 1.5;
  color: var(--text-tertiary);
  opacity: 0.7;
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
  transition: opacity 0.2s ease;
}

.icp a:hover {
  opacity: 0.7;
}

.edgeone {
  opacity: 0.45 !important;
}
</style>
