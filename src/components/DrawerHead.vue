<script setup lang="ts">
import { useDrawerStore } from '../stores/drawerStore'
import TitleBaseSlot from './TitleBaseSlot.vue'
import ButtonNavigation from './ButtonNavigation.vue'

const drawerStore = useDrawerStore()
</script>

<template>
  <div class="flex items-center gap-5 mb-5">
    <ButtonNavigation
      @click="drawerStore.closeDrawer()"
      class="border-[#000000] transition-all duration-500 opacity-30 hover:opacity-100"
    ></ButtonNavigation>
    <TitleBaseSlot>Корзина</TitleBaseSlot>
  </div>
</template>
