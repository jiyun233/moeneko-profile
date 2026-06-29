import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const dark = ref(false)

  function toggle() {
    dark.value = !dark.value
  }

  function setDark(value: boolean) {
    dark.value = value
  }

  return {
    dark,
    toggle,
    setDark,
  }
})
