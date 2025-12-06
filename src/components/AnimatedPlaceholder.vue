<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps<{
  height?: string
  width?: string
  borderRadius?: string
}>()

const { height, width, borderRadius } = toRefs(props)
</script>

<template>
  <div class="placeholder"></div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: 50% 0;
  }
  100% {
    background-position: -150% 0;
  }
}

.placeholder {
  width: v-bind(width);
  height: v-bind(height);
  border-radius: v-bind(borderRadius);

  background: linear-gradient(90deg, #e0e0e0 25%, #f9f9f9 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}
</style>
