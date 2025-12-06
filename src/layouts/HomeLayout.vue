<script setup lang="ts">
import { watch } from 'vue'
import Header from '@/components/Header.vue'
import Drawer from '@/components/Drawer.vue'
import { useDrawerStore } from '@/stores/DrawerStore'
import { useCartStore } from '@/stores/CartStore'
import Logo from '@/components/Logo.vue'

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
    class="w-4/5 bg-white m-auto rounded-xl shadow-xl mt-14 max-[1280px]:p-0 max-[1280px]:mt-0 max-[1280px]:w-full main-content"
  >
    <Header :total-price="cartStore.totalPrice" @open-drawer="drawerStore.openDrawer()" />

    <div class="p-10 max-[768px]:p-5">
      <router-view></router-view>
    </div>
  </div>
</template>
