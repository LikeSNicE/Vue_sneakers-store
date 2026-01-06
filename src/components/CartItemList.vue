<script setup lang="ts">
import { useCartStore } from '../stores/CartStore'
import CartItem from './CartItem.vue'

const cartStore = useCartStore()
</script>

<template>
  <div class="flex flex-col gap-4" v-auto-animate>
    <CartItem
      v-for="item in cartStore.cart"
      :key="item.id"
      :title="item.title"
      :price="item.price"
      :imageUrl="item.imageUrl"
      :totalPrice="cartStore.totalPrice"
      :vatPrice="cartStore.vatPrice"
      :quantity="item.quantity"
      :itemTotalPrice="item.price * item.quantity"
      @on-click-remove="() => cartStore.removeFromCart(item)"
      @on-inc-quantity="() => cartStore.incQuantity(item.id)"
      @on-dec-quantity="() => cartStore.decQuantity(item.id)"
    />
  </div>
</template>
