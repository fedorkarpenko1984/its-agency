<template>
  <div>
    <slider-with-title-and-breadcrumbs
      :slider-data-url="sliderDataUrl"
      :title="title"
    />
    <products :products-url="productsUrl" />
  </div>
</template>

<script setup lang="ts">
import SliderWithTitleAndBreadcrumbs from '@/modules/SliderWithTitleAndBreadcrumbs.vue'
import Products from '@/modules/Products.vue'

const title = 'Краски'
const sliderDataUrl = 'https://641861d975be53f451de014f.mockapi.io/api/slider'

const productsUrl = 'https://641861d975be53f451de014f.mockapi.io/api/paints'

</script>

<style scoped>

</style>