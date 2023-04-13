<template>
  <div
    class="card flex"
    :class="info.markedForRemove && 'opacity'"
  >
    <div
      v-show="info.markedForRemove" class="plug"></div>    
    <img :src="info.product.image" alt="фото товара">
    <div class="card__title">
      Краска {{ info.product.brand }}, {{ info.product.name }}
    </div>
    <div class="card__price">
      {{ info.product.price }}
    </div>
    <div class="card__controls flex items-center">
      <add-remove-button
        type="remove"
        @click="$emit('basket:remove')"
      />
      <span>{{ info.amountInBasket }}</span>
      <add-remove-button @click="$emit('basket:add')" />
    </div>
    <div class="card__icons pointer">
      <cross
        v-show="!info.markedForRemove"
        class="card__icons__cross"
        @click="$emit('product:marking')"
      />
      <restore
        v-show="info.markedForRemove"
        class="card__icons__restore"
        @click="$emit('product:unmarking')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddRemoveButton from '@/UI/AddRemoveButton.vue'
import Cross from '@/assets/icons/Cross.vue'
import Restore from '@/assets/icons/Restore.vue'
import { IBasketProduct } from '@/types/IBasketProduct'

defineProps<{
  info: IBasketProduct
}>()
const emit = defineEmits<{
  (event: 'basket:add'): void,
  (event: 'basket:remove'): void,
  (event: 'product:marking'): void,
  (event: 'product:unmarking'): void,
}>()

</script>

<style scoped lang="scss">
.opacity {
  opacity: 0.5;
  transition: all 0.5s;
}
.plug {
  width: 90%;
  height: 100%;
  position: absolute;
  left: 0;
  z-index: 10000; 
}
.card {
  width: 100%;
  height: 120px;
  position: relative;
  background: white;
  transition: all 0.5s;
  box-sizing: content-box;
  img {
    position: absolute;
    top: 12px;
    width: 96px;
    height: 96px;
  }
  &__title {
    position: absolute;
    left: 104px;
    top: 26px;
    width: 200px;
    font-size: 16px;
    font-weight: 300;
    line-height: 18px;
    letter-spacing: 0.02em;
  }
  &__price {
    position: absolute;
    top: 78px;
    left: 104px;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
  }
  &__controls {
    justify-content: space-between;
    width: 128px;
    position: absolute;
    left: 331px;
    top: 48px;
    font-size: 16px;
    line-height: 16px;
    color: #1F2020;
  }
  &__icons {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 46px;
    right: 0;
    &__cross {
      position: absolute;      
    }
  }
}
@media (max-width: 600px) {
  .card {
    height: 156px;
    &__controls {
      left: 24px;
      top: 120px;
    }
    &__icons {
      top: 66px;
    }
  }
}
</style>