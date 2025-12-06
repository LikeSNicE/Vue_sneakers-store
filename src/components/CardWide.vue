<script setup lang="ts">
defineProps<{
  imageUrl: string
  title: string
  price: number
}>()
</script>

<template>
  <div
    class="w-full flex justify-between items-center p-4 border border-slate-100 cursor-pointer min-w-0 gap-2 max-[768px]:flex-col"
  >
    <div class="flex items-center gap-4 min-w-0">
      <img class="w-[110px]" :src="imageUrl" alt="sneaker" />
      <h6 class="min-w-0 truncate">{{ title }}</h6>
    </div>
    <div
      class="flex gap-1 max-[768px]:flex-col max-[768px]:justify-center max-[768px]:items-center"
    >
      <span сlass="text-slate-400  max-[768px]:hidden ">Цена:</span>
      <p>
        <b>{{ price }}</b> тнг
      </p>
    </div>
  </div>
</template>
