<script setup lang="ts">
import { onMounted } from 'vue'
import { getErrorMessage } from '@/utils/errors'

onMounted(async () => {
  try {
    throw null
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error)
    console.log(typeof error)
    console.log('errorMessage: ', errorMessage)
  }
})
</script>

<template>
  <h1 class="font-bold text-3xl">Тестовая страница</h1>
</template>

<style scoped></style>
