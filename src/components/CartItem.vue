<script setup>
const emit = defineEmits(['onClickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
})

import { BASE_URL } from '@/config/baseUrl'
</script>

<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 min-w-0 max-[380px]:gap-2 max-[380px]:p-2"
  >
    <img class="w-16 h-16" :src="`${BASE_URL}${imageUrl.replace(/^\//, '')}`" :alt="title" />

    <div class="flex flex-col flex-1 min-w-0">
      <p class="truncate min-w-0">{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ price }} тенге.</b>
        <img
          @click="emit('onClickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="close cart"
        />
      </div>
    </div>
  </div>
</template>
