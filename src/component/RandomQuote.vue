<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchRandomQuote, type RandomQuoteData } from '@/utils/randomQuote'

const quote = ref<RandomQuoteData | null>(null)
const ready = ref(false)

onMounted(async () => {
  quote.value = await fetchRandomQuote()
  ready.value = true
})
</script>

<template>
  <div class="random-quote">
    <p class="quote-text" :class="{ show: ready }">{{ quote?.text ?? '　' }}</p>
    <p class="quote-from" :class="{ show: ready }">{{ quote ? `—— ${quote.from}` : '　' }}</p>
  </div>
</template>

<style scoped>
.random-quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 100%;
  max-width: 480px;
  min-width: 0;
  text-align: center;
}

.quote-text {
  font-size: clamp(0.85rem, 1.5vw, 1rem);
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
  letter-spacing: 0;
  overflow-wrap: anywhere;
  opacity: 0;
  transition: opacity 0.5s ease, color var(--theme-duration) var(--theme-easing);
}

.quote-text.show {
  opacity: 1;
}

.quote-from {
  font-size: clamp(0.7rem, 1.1vw, 0.82rem);
  color: var(--text-tertiary);
  margin: 0;
  opacity: 0;
  transition: opacity 0.5s ease 0.15s, color var(--theme-duration) var(--theme-easing);
}

.quote-from.show {
  opacity: 1;
}
</style>
