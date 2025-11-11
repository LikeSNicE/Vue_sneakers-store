<script setup>
import CardSkeleton from './CardSkeleton.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <CardSkeleton v-for="n in 12" :key="n" />
  </div>
</template>
