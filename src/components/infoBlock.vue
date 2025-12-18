<script setup lang="ts">
defineProps<{
  title: string
  description: string
  imageUrl: string
}>()

import { BASE_URL } from '@/config/baseUrl'
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img
      width="80"
      height="80"
      :src="`${BASE_URL}${imageUrl.replace(/^\//, '')}`"
      alt="Info image"
    />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400 mt-2">{{ description }}</p>
  </div>
</template>
