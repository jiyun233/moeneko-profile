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
img.onload = () => {
  isLoaded.value = true
}

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
    <n-config-provider :theme="theme.dark ? darkTheme : null">
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
  height: 100%;
  overflow: hidden;
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
  min-height: 100vh;
  width: 100%;
  background: var(--page-surface);
  transition: background-color var(--theme-duration) var(--theme-easing);
}
</style>
