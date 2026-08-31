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
    <div class="site-text">
      <h1 class="site-name">{{ SITE_NAME }}</h1>
      <p class="site-desc" @click="cycleDescription">{{ currentDesc }}</p>
    </div>
  </div>
</template>

<style scoped>
.site-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.site-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-width: 0;
}

.site-avatar {
  border: 1px solid var(--avatar-border);
  box-shadow: 0 4px 24px var(--card-shadow);
  transition: transform 0.3s ease, box-shadow var(--theme-duration) var(--theme-easing);
  flex-shrink: 0;
}

.site-avatar:hover {
  transform: scale(1.05);
}

.site-name {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  letter-spacing: 0;
  text-shadow: 0 2px 12px var(--text-shadow-color);
  user-select: none;
  overflow-wrap: anywhere;
  transition: color var(--theme-duration) var(--theme-easing), text-shadow var(--theme-duration) var(--theme-easing);
}

.site-desc {
  font-size: clamp(0.85rem, 1.6vw, 1.05rem);
  color: var(--text-secondary);
  margin: 0;
  cursor: pointer;
  overflow-wrap: anywhere;
  text-align: center;
  transition: color var(--theme-duration) var(--theme-easing), transform 0.3s ease;
  user-select: none;
}

.site-desc:hover {
  color: var(--text-primary);
  transform: scale(1.03);
}

.site-desc:active {
  transform: scale(0.97);
}

/* 横屏手机 / 高度不足: 头像与文字横向排列, 压缩卡片高度 */
@media (orientation: landscape) and (max-height: 620px) {
  .site-info {
    flex-direction: row;
    gap: 16px;
  }

  .site-text {
    align-items: flex-start;
    gap: 4px;
  }

  .site-avatar {
    width: 56px !important;
    height: 56px !important;
  }

  .site-name {
    font-size: clamp(1.3rem, 3vw, 1.8rem);
  }

  .site-desc {
    font-size: clamp(0.8rem, 1.4vw, 0.95rem);
    text-align: left;
  }
}
</style>
