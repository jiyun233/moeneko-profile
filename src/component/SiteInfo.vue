<script setup lang="ts">
import { ref } from 'vue'

const SITE_NAME = 'MoeJiyun233'
const DESCRIPTIONS = [
  '声に出すのは簡単で でも伝えるのは難しくて。',
  '你所热爱的，就是你的生活。',
]

const descIndex = ref(0)
const currentDesc = ref(DESCRIPTIONS[0])

function cycleDescription() {
  descIndex.value = (descIndex.value + 1) % DESCRIPTIONS.length
  currentDesc.value = DESCRIPTIONS[descIndex.value]
}
</script>

<template>
  <div class="site-info">
    <n-avatar
      :size="80"
      :src="'/avatar.png'"
      class="site-avatar"
    />
    <h1 class="site-name">{{ SITE_NAME }}</h1>
    <p class="site-desc" @click="cycleDescription">{{ currentDesc }}</p>
  </div>
</template>

<style scoped>
.site-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.site-avatar {
  border: 2px solid var(--avatar-border);
  box-shadow: 0 4px 24px var(--card-shadow);
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.site-avatar:hover {
  transform: scale(1.05);
  border-color: var(--text-secondary);
}

.site-name {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0.04em;
  text-shadow: 0 2px 12px var(--text-shadow-color);
  user-select: none;
}

.site-desc {
  font-size: clamp(0.85rem, 1.6vw, 1.05rem);
  color: var(--text-secondary);
  margin: 0;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
  user-select: none;
}

.site-desc:hover {
  color: var(--text-primary);
  transform: scale(1.03);
}

.site-desc:active {
  transform: scale(0.97);
}
</style>
