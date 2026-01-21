<script setup lang="ts">
import { watch } from 'vue'
import Header from '@/components/Header.vue'
import Drawer from '@/components/Drawer.vue'
import { useDrawerStore } from '@/stores/drawer-store'
import { useCartStore } from '@/stores/cart-store'

const drawerStore = useDrawerStore()
const cartStore = useCartStore()

watch(
  () => cartStore.cart,
  (newCart) => {
    localStorage.setItem('cart', JSON.stringify(newCart))
  },
  { deep: true },
)
</script>

<template>
  <Drawer
    v-if="drawerStore.drawerOpen"
    :total-price="cartStore.totalPrice"
    :vatPrice="cartStore.vatPrice"
  />

  <Header :total-price="cartStore.totalPrice" @open-drawer="drawerStore.openDrawer()" />
  <div class="container">
    <div
      class="m-auto rounded-xl max-[1280px]:p-0 max-[1280px]:mt-0 max-[1280px]:w-full main-content"
    >
      <div class="pt-4 pb-20">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
