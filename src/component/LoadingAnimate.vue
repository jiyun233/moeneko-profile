<script setup lang="ts">
import { ref, inject, watch, type Ref } from "vue"
import { sleep } from "@/utils/sleep"
import MOJANG from "@/assets/MOJANG.svg"

const emit = defineEmits(["close"])
const loaded = inject<Ref<boolean>>("loaded")
const width = ref(0)
let animation_finish = false

watch(() => loaded?.value, () => hide())

const timer = setInterval(() => {
  width.value += (94 - width.value) / 4
  if (width.value > 90) {
    clearInterval(timer)
    animation_finish = true
    hide()
  }
}, 100)

const hide = async () => {
  if (!animation_finish || !loaded?.value) return
  await sleep(400)
  width.value = 100
  await sleep(400)
  emit("close")
}

const bg = "rgb(241, 60, 69)"
const url = `url("${MOJANG}")`
</script>

<template>
  <section :style="{ background: bg }">
    <div class="logo" :style="{ 'background-image': url }"></div>
    <div class="progress-container">
      <div class="background">
        <div class="fill" :style="{ width: width + '%' }"></div>
      </div>
      <div class="loading-credit">
        Loading Animation From
        <a href="https://github.com/Ceale/ceale.moe" target="_blank" rel="noopener noreferrer">
          Ceale/ceale.moe
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.logo {
  width: 60vmin;
  height: 20vmin;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-bottom: 20vh;
}

.progress-container {
  position: fixed;
  bottom: 10vh;
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2vmin;
}

.background {
  width: 100%;
  height: 3vmin;
  padding: 0.5vmin;
  box-sizing: border-box;
  border: #ffffff solid 0.5vmin;
}

.fill {
  height: 100%;
  background-color: #ffffff;
  transition: width 400ms ease-out;
}

.loading-credit {
  font-size: 1.4vmin;
  color: #ffffff;
  opacity: 0.5;
  font-weight: 300;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  transition: opacity 0.3s ease;
}

.loading-credit a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
}

.loading-credit a:hover {
  opacity: 1;
  border-bottom-color: rgba(255, 255, 255, 0.6);
  text-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
}

@media (max-width: 600px) {
  .loading-credit {
    font-size: 2.5vmin;
  }
}
</style>
