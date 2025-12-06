<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<template>
  <div class="flex items-center p-4">
    <div class="flex items-center gap-4">
      <AnimatedPlaceholder width="110px" height="110px" />
      <AnimatedPlaceholder width="320px" height="24px" />
    </div>
    <div class="flex gap-1 ml-auto">
      <AnimatedPlaceholder width="40px" height="24px" border-radius="10px" />
      <AnimatedPlaceholder width="40px" height="24px" border-radius="10px" />
    </div>
  </div>
</template>
