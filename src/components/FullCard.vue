<script setup lang="ts">
import { onMounted } from 'vue'
import BaseButton from './BaseButton.vue'

import { useRoute } from 'vue-router'
import { useGoodsStore } from '@/stores/goods-store'
import { BASE_URL } from '@/config/baseUrl'

const route = useRoute()
const goodsStore = useGoodsStore()

const userId = Number(route.params.sneakerId)

onMounted(async () => {
  await goodsStore.fetchSneaker(userId)
})
</script>

<template>
  <nav class="flex-warp md:flex justify-between" aria-label="Breadcrumb">
    <ul class="inline-flex items-center mb-3 space-x-2.5 md:space-x-2rtl:space-x-reverse sm:mb-0">
      <li>
        <div class="flex items-center">
          <RouterLink to="/" href="#" class="text-sm text-body hover:text-fg-brand"
            >Главная</RouterLink
          >
        </div>
      </li>
      <li aria-current="page">
        <div class="flex items-center space-x-2.5">
          <svg
            class="w-3.5 h-3.5 rtl:rotate-180 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m9 5 7 7-7 7"
            />
          </svg>
          <span class="text-sm font-bold text-body-subtle">{{
            goodsStore.currentSneaker?.title
          }}</span>
        </div>
      </li>
    </ul>
  </nav>

  <div v-if="goodsStore.currentSneaker" class="flex mt-7 gap-3">
    <div class="flex-1">
      <div class="overflow-hidden">
        <img
          v-if="goodsStore.currentSneaker?.imageUrl"
          :src="`${BASE_URL}${goodsStore.currentSneaker.imageUrl}`"
          :alt="goodsStore.currentSneaker.imageUrl"
          class="w-full h-full object-cover"
        />

        <div v-else class="flex items-center justify-center h-80">
          <p>Загрузка...</p>
        </div>
      </div>
    </div>

    <div class="min-w-0 flex-1">
      <div class="flex justify-between">
        <h4 class="uppercase font-bold">Nike</h4>
        <img
          @click="goodsStore.addToFavorite(goodsStore.currentSneaker)"
          class="cursor-pointer"
          :src="
            !goodsStore.currentSneaker.isFavorite
              ? `${BASE_URL}like-1.svg`
              : `${BASE_URL}like-2.svg`
          "
          alt="heart"
        />
      </div>

      <h1 class="mt-2.5 min-w-0 truncate font-semibold text-4xl">
        {{ goodsStore.currentSneaker?.title }}
      </h1>

      <div class="flex gap-8 mt-3 items-center">
        <div class="flex gap-1 items-center">
          <div class="flex items-center space-x-1">
            <svg
              class="w-5 h-5 text-fg-yellow"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              class="w-5 h-5 text-fg-yellow"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              class="w-5 h-5 text-fg-yellow"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              class="w-5 h-5 text-fg-yellow"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
            <svg
              class="w-5 h-5 text-fg-disabled"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
              />
            </svg>
          </div>

          <p>10 отзывов</p>
        </div>

        <div class="flex gap-1 items-center">
          <div class="text-sm">Подробнее</div>
          <svg
            class="mt-1"
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.392 4.03544C13.5872 3.84018 13.5872 3.52359 13.392 3.32833L10.21 0.146351C10.0147 -0.0489113 9.69813 -0.0489113 9.50287 0.146351C9.30761 0.341613 9.30761 0.658195 9.50287 0.853458L12.3313 3.68188L9.50287 6.51031C9.30761 6.70557 9.30761 7.02216 9.50287 7.21742C9.69813 7.41268 10.0147 7.41268 10.21 7.21742L13.392 4.03544ZM0 3.68188L0 4.18188H13.0384V3.68188V3.18188H0L0 3.68188Z"
              fill="black"
            />
          </svg>
        </div>
      </div>

      <p class="text-2xl mt-7">{{ goodsStore.currentSneaker?.price }} тенге</p>

      <p class="font-thin">размеры</p>

      <div class="grid grid-cols-6 gap-1 w-[200px]">
        <div
          class="inline-flex justify-center items-centerp-1 p-1 bg-gray-300 cursor-pointer"
          v-for="size in 7"
          :key="size"
        >
          {{ size }}
        </div>
      </div>

      <BaseButton
        @click="goodsStore.onClickAddPlus(goodsStore.currentSneaker)"
        class="w-full py-2 mt-4"
        :class="[goodsStore.currentSneaker.isAdded ? 'bg-gray-600 hover:bg-gray-600' : '']"
      >
        Купить</BaseButton
      >
    </div>
  </div>
</template>

<style></style>
