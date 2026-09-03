<script setup lang="ts">
import {
  siGithub,
  siBilibili,
  siSteam,
  siTelegram,
  siDiscord,
} from 'simple-icons'
import { Mail16Regular } from '@vicons/fluent'
import type { Component } from 'vue'

interface LinkItem {
  label: string
  url: string
  color: string
  path?: string
  icon?: Component
}

const links: LinkItem[] = [
  { label: 'GitHub', url: 'https://github.com/jiyun233', color: siGithub.hex, path: siGithub.path },
  { label: 'bilibili', url: 'https://space.bilibili.com/245830927', color: siBilibili.hex, path: siBilibili.path },
  { label: 'Discord', url: 'https://discord.com/users/ji_yun233', color: siDiscord.hex, path: siDiscord.path },
  { label: 'Telegram', url: 'https://t.me/jiyun233', color: siTelegram.hex, path: siTelegram.path },
  { label: 'Steam', url: 'https://steamcommunity.com/profiles/76561199086420886/', color: siSteam.hex, path: siSteam.path },
  { label: 'Mail me', url: 'mailto:koishi@origin.pw', color: '536371', icon: Mail16Regular },
]
</script>

<template>
  <div class="link-bar">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.url"
      :target="link.url.startsWith('mailto:') ? undefined : '_blank'"
      :rel="link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
      class="link-item"
      :style="{ '--brand': '#' + link.color }"
    >
      <span class="link-icon">
        <svg v-if="link.path" viewBox="0 0 24 24" class="brand-svg">
          <path :d="link.path" fill="currentColor" />
        </svg>
        <n-icon v-else size="20">
          <component :is="link.icon" />
        </n-icon>
      </span>
      <span class="link-label">{{ link.label }}</span>
    </a>
  </div>
</template>

<style scoped>
.link-bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(8px, 2vmin, 14px);
  width: 100%;
}

.link-item {
  --brand: #6f83a0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 56px;
  text-decoration: none;
  color: var(--icon-color);
  cursor: pointer;
}

.link-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--icon-bg);
  border: 1px solid transparent;
  border-radius: 50%;
  color: var(--icon-color);
  transition:
    transform 0.22s ease,
    color 0.22s ease,
    background-color var(--theme-duration) var(--theme-easing),
    border-color var(--theme-duration) var(--theme-easing);
}

.brand-svg {
  width: 20px;
  height: 20px;
}

.link-item:hover .link-icon {
  color: color-mix(in srgb, var(--brand) 65%, var(--icon-color-hover));
  background: var(--btn-hover-bg);
  border-color: var(--btn-border);
  transform: translateY(-2px);
}

.link-label {
  font-size: clamp(0.65rem, 1.2vw, 0.75rem);
  color: var(--btn-text);
  transition: color 0.2s ease;
}

.link-item:hover .link-label {
  color: var(--btn-text-hover);
}

@media (max-width: 767px) {
  .link-item {
    width: 52px;
  }

  .link-icon {
    width: 34px;
    height: 34px;
  }

  .brand-svg {
    width: 18px;
    height: 18px;
  }
}
</style>
