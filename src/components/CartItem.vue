<script setup lang="ts">
import { BASE_URL } from '@/config/baseUrl'

const emit = defineEmits(['onClickRemove', 'onIncQuantity', 'onDecQuantity'])

const props = defineProps<{
  title: string
  imageUrl: string
  price: number
  totalPrice: number
  vatPrice: number
  quantity: number
  itemTotalPrice: number
}>()
</script>

<template>
  <div
    class="flex items-center border border-slate-200 p-4 rounded-xl gap-4 min-w-0 max-[380px]:gap-2 max-[380px]:p-2"
  >
    <img class="w-16 h-16" :src="`${BASE_URL}${imageUrl.replace(/^\//, '')}`" :alt="title" />

    <div class="flex flex-col flex-1 min-w-0">
      <div class="flex justify-between items-center">
        <b>{{ itemTotalPrice }} тенге.</b>

        <img
          @click="emit('onClickRemove')"
          class="opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="close cart"
        />
      </div>

      <div class="flex justify-between gap-1 mt-2 min-w-0">
        <p class="truncate min-w-0">{{ title }}</p>

        <div class="flex gap-1 items-center">
          <button
            @click="emit('onDecQuantity')"
            class="flex justify-center items-center w-6 h-6 rounded-full text-white focus:outline-none bg-gray-400 hover:bg-gray-500"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              ></path>
            </svg>
          </button>
          <p class="rounded-xl border w-8 text-center border-slate-900">{{ quantity }}</p>
          <button
            @click="emit('onIncQuantity')"
            class="bg-[#84CC16] text-white rounded-full w-6 h-6 text-center flex justify-center items-center focus:outline-none"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v12M6 12h12"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
