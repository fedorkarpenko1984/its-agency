<template>
    <div
      class="product-card"
      :class="border && 'border'"
    >
      <div class="product-card__image-wrapper flex items-center justify-center">
        <img :src="product.image" alt="">
      </div>
      <div class="product-card__title">Краска {{ product.brand }}, {{ product.name }}</div>
      <div class="product-card__price">{{ product.price }} ₽</div>
      <add-remove-button
        size="big"
        class="product-card__add-button"
        @click="$emit('product:add')"
      />
    </div>
</template>

<script setup lang="ts">
import AddRemoveButton from '@/UI/AddRemoveButton.vue'
import { IProduct } from '@/types/IProduct'

const props = defineProps<{
  product: IProduct,
  border: boolean,
}>()

const emit = defineEmits<{
  (event: 'product:add', payload: IProduct): void
}>()
</script>

<style scoped lang="scss">
.product-card {
  width: 278px;
  height: 392px;
  position: relative;
  &__image-wrapper {
    width: 278px;
    height: 278px;
    img {
      width: 200px;
      height: 200px;
      transition: all 0.5s linear;
      position: relative;
    }
  }
  &__title {
    margin-top: 16px;
    font-size: 16px;
    font-weight: 300;
    line-height: 18px;
    color: #1F2020;
  }
  &__price {
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    position: absolute;
    bottom: 22px;
  }
  &__add-button {
    position: absolute;
    bottom: 14px;
    right: 0;
    opacity: 0;
    transition: all 0.5s linear;
  }
  &:hover > .product-card__add-button {
    opacity: 1;
    transition: all 0.5s linear;
  }
  &:hover > .product-card__image-wrapper {
    img {
      width: 100%;
      height: 100%;
      transition: all 0.5s linear;
    }
  }
}
  
.border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
}
@media (max-width: 992px) {
  .product-card {
    width: 156px;
    height: 304px;
    &__add-button {
      opacity: 1;
      bottom: 34px;
    }
    &__price {
      bottom: 38px;
    }
    &__image-wrapper {
      width: 156px;
      height: 156px;
      img {
        width: 156px;
        height: 156px;
      }
    }
  }
}
</style>
