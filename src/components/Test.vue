<template>
  <div class="flex justify-end">
    <div
      @mouseenter="isActiveMenu = true"
      @mouseleave="isActiveMenu = false"
      class="bg-blue-600 rounded-full w-10 h-10 relative"
    >
      <!-- Выпадающее меню с анимацией -->
      <transition name="scale">
        <div
          v-if="isActiveMenu"
          class="absolute w-[400px] bg-[#f2f2f2] top-0 right-0 rounded-2xl flex flex-col p-2 shadow-lg"
        >
          <!-- Вложенная аватарка -->
          <div
            class="bg-blue-600 rounded-full w-10 h-10 absolute right-0 top-0 translate-x-[-8px] translate-y-[8px]"
          ></div>

          <ul class="py-2 text-sm mt-12">
            <li class="block px-4 py-2 hover:bg-gray-300 rounded-lg">test1</li>
            <li class="block px-4 py-2 hover:bg-gray-300 rounded-lg">test2</li>
            <li class="block px-4 py-2 hover:bg-gray-300 rounded-lg">test3</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isActiveMenu = ref(false)
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.18s ease;
  transform-origin: top right;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
