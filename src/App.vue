<template>
  <div>
    <header-component @basket:open="openBasket" />
    <products-view />
    <basket
      v-show="isBasketOpen"
      @basket:close="closeBasket"
    />
    <footer-component />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './UI/FooterComponent.vue'
import ProductsView from './views/ProductsView.vue'
import Basket from './modules/Basket.vue'
import { useBasketStore } from './store/basketStore'

const basketStore = useBasketStore()

const isBasketOpen = ref<boolean>(false)
const openBasket = () => {
  isBasketOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeBasket = () => {
  isBasketOpen.value = false
  document.body.style.overflow = 'scroll'
  basketStore.removeMarkedProducts()
}
</script>

