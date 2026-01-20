<script setup lang="ts">
defineProps<{
  label?: string
  isLoading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent): void => emit('click', event)
</script>

<template>
  <button
    :disabled="disabled || isLoading"
    @click="handleClick"
    class="bg-lime-600 rounded-xl py-3 text-white font-semibold hover:bg-lime-500 transition active:bg-lime-700 disabled:bg-slate-400 cursor-pointer"
    :class="[isLoading ? 'bg-lime-600' : 'bg-lime-500 hover:bg-lime-600']"
  >
    <!-- {{ isLoading ? 'Загрузка...' : label }} -->
    <slot></slot>
  </button>
</template>
