<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<template>
  <div class="flex flex-col gap-2">
    <AnimatedPlaceholder width="150px" height="150px" border-radius="50%" />
    <AnimatedPlaceholder width="150px" height="30px" border-radius="10px" />
    <AnimatedPlaceholder width="w-full" height="30px" border-radius="10px" />
  </div>
</template>
