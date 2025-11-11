<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: String,
})
</script>

<template>
  <div class="w-full flex justify-between items-center p-4 border border-slate-100 cursor-pointer">
    <div class="flex items-center gap-4">
      <img class="w-[110px]" :src="imageUrl" alt="sneaker" />
      <h6>{{ title }}</h6>
    </div>
    <div class="flex gap-1">
      <span сlass="text-slate-400">Цена:</span>
      <p>
        <b>{{ price }}</b> тнг
      </p>
    </div>
  </div>
</template>
