<script setup lang="ts">
import { useGoodsStore } from '@/stores/goodsStore'

type PaginationProps = {
  currentPage: number | undefined
  totalPages: number | undefined
}

defineProps<PaginationProps>()

const goodsStore = useGoodsStore()
</script>

<template>
  <div class="flex gap-2 justify-center mt-4">
    <button
      v-for="page in totalPages"
      class="px-3 py-1 rounded-full text-white cursor-pointer transition ease-in-out duration-300 hover:bg-lime-500"
      :class="[page === currentPage ? 'bg-lime-600' : 'bg-gray-600']"
      @click="goodsStore.setCurrentPage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>
