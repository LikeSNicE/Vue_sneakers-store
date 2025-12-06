<script setup lang="ts">
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
import CardWideSkeleton from './CardWideSkeleton.vue'
</script>

<template>
  <div class="mb-2 border rounded-2xl">
    <div class="flex justify-between mb-4 p-4 border-b-2">
      <AnimatedPlaceholder width="120px" height="28px" border-radius="10px" />
      <AnimatedPlaceholder width="240px" height="28px" border-radius="10px" />
    </div>

    <div class="">
      <!-- <CardSkeleton /> -->
      <CardWideSkeleton />
    </div>

    <div class="flex justify-end p-4 border-t-2">
      <AnimatedPlaceholder width="120px" height="28px" border-radius="10px" />
    </div>
  </div>
</template>
