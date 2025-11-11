<script setup>
import AnimatedPlaceholder from './AnimatedPlaceholder.vue'
</script>

<template>
  <div class="bg-white border border-slate-100 rounded-3xl p-8">
    <AnimatedPlaceholder width="w-full" height="90px" border-radius="10px" />

    <AnimatedPlaceholder class="mt-4" width="150px" height="15px" border-radius="3px" />

    <AnimatedPlaceholder class="mt-1" width="90px" height="15px" border-radius="3px" />

    <div class="flex justify-between mt-4">
      <AnimatedPlaceholder width="80px" height="24px" border-radius="8px" />

      <AnimatedPlaceholder width="32px" height="32px" border-radius="8px" />
    </div>
  </div>
</template>
