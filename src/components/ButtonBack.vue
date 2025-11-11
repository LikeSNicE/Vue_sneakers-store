<script setup>
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.go(-1)
}
</script>

<template>
  <button @click="goBack">
    <RouterLink
      class="inline-flex items-center gap-2 bg-lime-600 py-2 px-4 rounded-lg text-white mt-4 font-semibold"
    >
      <svg
        class="rotate-180"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p>Вернуться назад</p>
    </RouterLink>
  </button>
</template>
