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
  document.documentElement.style.setProperty('--bg-url', `url(${bgUrl})`)
}

const theme = useThemeStore()

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
  <div class="app-wrapper" :style="{ '--bg-url': `url(${bgUrl})` }">
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
  --card-bg: rgba(248, 247, 244, 0.62);
  --card-border: rgba(0, 0, 0, 0.06);
  --card-shadow: rgba(0, 0, 0, 0.04);
  --text-primary: #1f1f1f;
  --text-secondary: rgba(0, 0, 0, 0.58);
  --text-tertiary: rgba(0, 0, 0, 0.42);
  --track-bg: rgba(0, 0, 0, 0.07);
  --btn-bg: rgba(0, 0, 0, 0.05);
  --btn-border: rgba(0, 0, 0, 0.08);
  --btn-hover-bg: rgba(0, 0, 0, 0.1);
  --btn-text: rgba(0, 0, 0, 0.55);
  --btn-text-hover: rgba(0, 0, 0, 0.8);
  --icon-bg: rgba(0, 0, 0, 0.055);
  --icon-color: rgba(0, 0, 0, 0.52);
  --icon-color-hover: rgba(0, 0, 0, 0.75);
  --avatar-border: rgba(0, 0, 0, 0.12);
  --text-shadow-color: rgba(0, 0, 0, 0.04);
  --fill-white: rgba(0, 0, 0, 0.55);
  --bg-brightness: 1.15;
}

html.dark {
  --card-bg: rgba(0, 0, 0, 0.18);
  --card-border: rgba(255, 255, 255, 0.07);
  --card-shadow: rgba(0, 0, 0, 0.25);
  --text-primary: #fff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.45);
  --track-bg: rgba(255, 255, 255, 0.08);
  --btn-bg: rgba(255, 255, 255, 0.06);
  --btn-border: rgba(255, 255, 255, 0.08);
  --btn-hover-bg: rgba(255, 255, 255, 0.12);
  --btn-text: rgba(255, 255, 255, 0.5);
  --btn-text-hover: rgba(255, 255, 255, 0.9);
  --icon-bg: rgba(255, 255, 255, 0.08);
  --icon-color: rgba(255, 255, 255, 0.65);
  --icon-color-hover: #fff;
  --avatar-border: rgba(255, 255, 255, 0.25);
  --text-shadow-color: rgba(0, 0, 0, 0.3);
  --fill-white: #fff;
  --bg-brightness: 0.65;
}

body {
  background: var(--card-bg);
  color: var(--text-primary);
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
}
</style>
