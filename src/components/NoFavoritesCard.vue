<script setup lang="ts">
import NoElementsInPage from './NoElementsInPage.vue'
</script>

<template>
  <NoElementsInPage>
    <template #emoji>😔</template>
    <template #title>Избранных товаров нет</template>
    <template #text>Вы ничего не добавляли в избранное</template>
  </NoElementsInPage>
</template>
