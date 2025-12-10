<script setup lang="ts">
interface BaseInput {
  type?: string
  label?: string
  modelValue?: string | number
  placeholder?: string
}

const { type = 'text', label = '', modelValue = '', placeholder = '' } = defineProps<BaseInput>()

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="block mb-2 text-sm font-medium">{{ label }}</label>
    <input
      class="border focus:outline-none focus:ring-2 focus:ring-lime-600 p-2 w-full rounded-xl transition placeholder-gray-400 ease-in-out duration-300"
      :placeholder="placeholder"
      :type="type"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>
