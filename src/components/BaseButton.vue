<script setup>
defineProps({
  label: String,
  isLoading: Boolean,
  disabled: Boolean,
  fullWidth: Boolean,
  margin: String,
  padding: String,
})

// 1 сигнал вызова
const emit = defineEmits(['click'])
</script>

<template>
  <button
    :disabled="disabled || isLoading"
    @click="emit('click')"
    class="bg-lime-500 rounded-xl py-3 text-white font-semibold hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-400 cursor-pointer"
    :class="[
      fullWidth ? 'w-full' : '',
      isLoading ? 'bg-lime-600' : 'bg-lime-500 hover:bg-lime-600',
      margin,
      padding,
    ]"
  >
    {{ isLoading ? 'Загрузка...' : label }}
  </button>
</template>
