<script setup lang="ts">
import { onMounted, provide, ref, watch } from 'vue'
import { darkTheme } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { Collections } from './utils/collections'
import LoadingAnimate from './component/LoadingAnimate.vue'
import SiteFooter from './component/SiteFooter.vue'

const showLoading = ref(true)
const isLoaded = ref(false)
provide('loaded', isLoaded)

const handleClose = () => {
  showLoading.value = false
}

const bgs = [
  'https://i.imglt.com/20260629/f456fcbca75ddc5114a613df1faae220.jpg',
]

const bgUrl = `${Collections.getRandomItem(bgs)}`
const img = new Image()
img.src = bgUrl
const markLoaded = () => {
  isLoaded.value = true
}
img.onload = markLoaded
// 背景图加载失败或超时也不能卡死加载页
img.onerror = markLoaded
setTimeout(markLoaded, 6000)

const theme = useThemeStore()
provide('backgroundUrl', bgUrl)

onMounted(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.setDark(true)
  }
})

watch(
  () => theme.dark,
  (val) => {
    document.documentElement.classList.toggle('dark', val)
  },
  { immediate: true },
)
</script>

<template>
  <div class="app-wrapper">
    <Transition name="page-fade">
      <LoadingAnimate v-if="showLoading" @close="handleClose" />
    </Transition>
    <n-config-provider abstract :theme="theme.dark ? darkTheme : null">
      <n-notification-provider>
        <n-dialog-provider>
          <n-message-provider>
            <RouterView />
            <SiteFooter />
          </n-message-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-config-provider>
  </div>
</template>

<style>
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100%;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

:root {
  color-scheme: light;
  --theme-duration: 520ms;
  --theme-easing: cubic-bezier(0.22, 1, 0.36, 1);
  --page-surface: #e5ebf0;
  --card-bg: rgba(255, 255, 255, 0.86);
  --card-border: rgba(48, 63, 78, 0.14);
  --card-border-hover: rgba(48, 63, 78, 0.24);
  --card-shadow: rgba(36, 50, 65, 0.2);
  --text-primary: #1f2933;
  --text-secondary: #52616f;
  --text-tertiary: #71808e;
  --track-bg: rgba(31, 41, 51, 0.12);
  --btn-bg: rgba(31, 41, 51, 0.06);
  --btn-border: rgba(31, 41, 51, 0.12);
  --btn-hover-bg: rgba(31, 41, 51, 0.12);
  --btn-text: #4d5c69;
  --btn-text-hover: #17212b;
  --icon-bg: rgba(31, 41, 51, 0.06);
  --icon-color: #536371;
  --icon-color-hover: #17212b;
  --avatar-border: rgba(31, 41, 51, 0.14);
  --text-shadow-color: rgba(36, 50, 65, 0.08);
  --fill-white: #465664;
  --bg-brightness: 1.08;
  --bg-saturation: 0.66;
  --bg-contrast: 0.92;
  --bg-overlay: rgba(229, 235, 240, 0.48);
  --footer-bg: rgba(255, 255, 255, 0.8);
}

/*noinspection CssUnusedSymbol*/
html.dark {
  color-scheme: dark;
  --page-surface: #111820;
  --card-bg: rgba(21, 30, 39, 0.9);
  --card-border: rgba(206, 221, 233, 0.16);
  --card-border-hover: rgba(206, 221, 233, 0.3);
  --card-shadow: rgba(0, 0, 0, 0.58);
  --text-primary: #f0f5f8;
  --text-secondary: #bdc9d2;
  --text-tertiary: #91a1ad;
  --track-bg: rgba(240, 245, 248, 0.12);
  --btn-bg: rgba(240, 245, 248, 0.08);
  --btn-border: rgba(240, 245, 248, 0.14);
  --btn-hover-bg: rgba(240, 245, 248, 0.16);
  --btn-text: #c2cdd5;
  --btn-text-hover: #ffffff;
  --icon-bg: rgba(240, 245, 248, 0.08);
  --icon-color: #c4d0d8;
  --icon-color-hover: #ffffff;
  --avatar-border: rgba(240, 245, 248, 0.2);
  --text-shadow-color: rgba(0, 0, 0, 0.35);
  --fill-white: #d8e2e9;
  --bg-brightness: 0.32;
  --bg-saturation: 0.46;
  --bg-contrast: 1.08;
  --bg-overlay: rgba(8, 13, 18, 0.64);
  --footer-bg: rgba(15, 23, 31, 0.86);
}

body {
  background: var(--page-surface);
  color: var(--text-primary);
  transition:
    background-color var(--theme-duration) var(--theme-easing),
    color var(--theme-duration) var(--theme-easing);
}

/*noinspection ALL*/
.page-fade-leave-active {
  transition: opacity 800ms ease !important;
}

/*noinspection ALL*/
.page-fade-leave-to {
  opacity: 0 !important;
}

/*noinspection ALL*/
.page-fade-leave-from {
  opacity: 1;
}
</style>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100%;
  background: var(--page-surface);
  transition: background-color var(--theme-duration) var(--theme-easing);
}

/*noinspection ALL*/
.app-wrapper > :deep(.n-config-provider) {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}
</style>
