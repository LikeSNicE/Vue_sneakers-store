<script setup lang="ts">
interface BaseInput {
  type?: string
  label?: string
  modelValue?: string | number
  placeholder?: string
  onInput?: (event: Event) => void
  error?: string
}
defineOptions({ inheritAttrs: false })
const {
  type = 'text',
  label = '',
  modelValue = '',
  placeholder = '',
  onInput,
  error,
} = defineProps<BaseInput>()
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex flex-col gap-1">
    <label v-if="label" class="block mb-2 text-sm font-medium">{{ label }}</label>
    <input
      class="border focus:outline-none focus:ring-2 focus:ring-lime-600 p-2 w-full rounded-xl transition placeholder-gray-400 ease-in-out duration-300"
      :class="[error ? 'border-red-500 focus:ring-red-500' : 'border-lime-600 focus:ring-lime-600']"
      v-bind="$attrs"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue ?? $attrs.value"
      @input="
        ($event: Event) => {
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
          onInput?.($event)
        }
      "
    />
    <p class="text-red-600 text-sm">{{ error }}</p>
  </div>
</template>
