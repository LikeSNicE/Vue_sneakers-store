import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isElementOpen = ref(false)

  const closeAllMenus = () => {
    isElementOpen.value = false
  }

  const toggleProfileMenu = () => {
    isElementOpen.value = !isElementOpen.value
  }

  return { isElementOpen, closeAllMenus, toggleProfileMenu }
})
