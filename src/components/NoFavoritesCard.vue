<script setup>
import NoElementsInPage from './NoElementsInPage.vue'
import ButtonBack from './ButtonBack.vue'
</script>

<template>
  <NoElementsInPage>
    <template #emoji>😔</template>
    <template #title>Избранных товаров нет</template>
    <template #text>Вы ничего не добавляли в избранное</template>
    <template #button-back>
      <ButtonBack></ButtonBack>
    </template>
  </NoElementsInPage>
</template>
