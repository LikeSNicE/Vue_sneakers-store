<script setup>
import NoElementsInPage from './NoElementsInPage.vue'
</script>

<template>
  <NoElementsInPage>
    <template #emoji>🥺</template>
    <template #title>У вас нет заказов</template>
    <template #text>
      <div class="text-center">
        <p>Вы нищеброд?</p>
        <p>Оформите хотя бы один заказ.</p>
      </div>
    </template>
    <template #button-back>
      <ButtonBack></ButtonBack>
    </template>
  </NoElementsInPage>
</template>
