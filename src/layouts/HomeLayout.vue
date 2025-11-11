<script setup>
import { watch } from 'vue'
import Header from '@/components/Header.vue'
import Drawer from '@/components/Drawer.vue'
import { useDrawerStore } from '@/stores/DrawerStore'
import { useCartStore } from '@/stores/CartStore'

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

  <div
    class="w-4/5 bg-white m-auto rounded-xl shadow-xl mt-14 max-[1024px]:p-0 max-[1024px]:mt-0 max-[1024px]:w-full"
  >
    <Header :total-price="cartStore.totalPrice" @open-drawer="drawerStore.openDrawer()" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
