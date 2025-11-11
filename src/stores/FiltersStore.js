import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useFilterStore = defineStore('filters', () => {
  const filters = reactive({
    sortBy: 'title',
    searchQuery: '',
  })

  return {
    filters,
  }
})
