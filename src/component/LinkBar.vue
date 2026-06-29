<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Code16Regular, Mail16Regular, MoviesAndTv16Regular } from '@vicons/fluent'

interface SocialLink {
  label: string
  url: string
  icon: 'github' | 'bilibili' | 'email'
}

interface SiteLink {
  label: string
  url: string
}

const router = useRouter()

const socialLinks: SocialLink[] = [
  { label: 'GitHub', url: 'https://github.com/jiyun233', icon: 'github' },
  { label: 'Bilibili', url: 'https://space.bilibili.com/245830927', icon: 'bilibili' },
  { label: 'Email', url: 'mailto:koishi@origin.pw', icon: 'email' },
]

const siteLinks: SiteLink[] = [
  { label: '博客', url: '/blog' },
  { label: '项目', url: '/projects' },
  { label: '关于', url: '/about' },
  { label: '友链', url: '/links' },
]

function navigate(url: string) {
  if (url.startsWith('/')) {
    router.push(url)
  } else if (url.startsWith('http')) {
    window.open(url, '_blank', 'noopener,noreferrer')
  }
}

const iconMap: Record<SocialLink['icon'], typeof Code16Regular> = {
  github: Code16Regular,
  bilibili: MoviesAndTv16Regular,
  email: Mail16Regular,
}
</script>

<template>
  <div class="link-bar">
    <div class="social-links">
      <n-button
        v-for="link in socialLinks"
        :key="link.label"
        circle
        quaternary
        class="social-link"
        tag="a"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        :title="link.label"
        :external="link.icon !== 'email'"
      >
        <n-icon size="18">
          <component :is="iconMap[link.icon]" />
        </n-icon>
      </n-button>
    </div>
    <div class="site-links">
      <n-button
        v-for="link in siteLinks"
        :key="link.label"
        secondary
        round
        size="small"
        class="site-link"
        @click="navigate(link.url)"
      >
        {{ link.label }}
      </n-button>
    </div>
  </div>
</template>

<style scoped>
.link-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.social-links {
  display: flex;
  gap: 18px;
}

.social-link {
  width: 38px;
  height: 38px;
  color: var(--icon-color) !important;
}

.social-link:hover {
  color: var(--icon-color-hover) !important;
}

.site-links {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: center;
}

.site-link {
  color: var(--btn-text) !important;
  border-color: var(--btn-border) !important;
}

.site-link:hover {
  color: var(--btn-text-hover) !important;
  border-color: var(--btn-hover-bg) !important;
}
</style>
