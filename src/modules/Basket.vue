<template>
  <div class="basket-wrapper" @click="$emit('basket:close')">
    <div class="basket" @click.stop>
      <div class="basket__header">
        <div class="basket__header__title">Корзина</div>
        <close-basket
          class="basket__header__close-basket pointer"
          @click="$emit('basket:close')"
        />
        <div class="basket__header__amount">
          {{
            basketStore.getBasketProductsAmount
            ? productsAmountTextHelper(basketStore.getBasketProductsAmount)
            : 'ТОВАРЫ НЕ ВЫБРАНЫ'
          }}
        </div>
        <div
          class="basket__header__clear-list pointer"
          @click="basketStore.clearProductList"
        >
          очистить список
        </div>
      </div>
      <div class="product-cards-wrapper flex column items-center">
        <div class="product-cards">
          <basket-product-card 
            v-for="product in basketStore.$state.products"
            :key="product.product.id"
            :info="product"
            :marked-for-remove="product.markedForRemove"
            @product:marking="basketStore.productMarking(product.product.id)"
            @product:unmarking="basketStore.productUnmarking(product.product.id)"
            @basket:add="basketStore.addProductFromBasket(product)"
            @basket:remove="basketStore.removeProductFromBasket(product)"
          />
        </div>
      </div>
      <div class="amount">
        <div class="amount__label">Итого</div>
        <div class="amount__number">{{ basketStore.getAllProductsSumPrice }} ₽</div>
      </div>
      <button
        class="submit-btn" @click="submitOrder">ОФОРМИТЬ ЗАКАЗ</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasketProductCard from '@/components/BasketProductCard.vue';
import CloseBasket from '@/assets/icons/CloseBasket.vue'
import { productsAmountTextHelper } from '@/helpers/productsAmountTextHelper'
import { useBasketStore } from '@/store/basketStore'

const basketStore = useBasketStore()

const submitOrder = () => {
  // логика отправки данных на сервер
  basketStore.clearProductList()
}

const emit = defineEmits<{
  (event: 'basket:close'): void
}>()
</script>

<style scoped lang="scss">
.basket-wrapper {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5000;
}
.basket {
  position: absolute;
  width: 600px;
  top: 0;
  height: 100vh;
  right: 0;
  background: white;
  &__header {
    width: calc(100% - 80px);
    height: 186px;
    position: relative;
    margin: 0 auto;
    box-sizing: content-box;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &__title {
      position: absolute;
      font-size: 30px;
      font-weight: 500;
      line-height: 26px;
      letter-spacing: -0.04em;
      top: 40px;
    }
    &__amount {
      position: absolute;
      font-size: 14px;
      line-height: 16px;
      bottom: 10px;
      color: #1F2020;

    }
    &__clear-list {
      position: absolute;
      right: 0;
      bottom: 10px;
      font-size: 14px;
      font-weight: 300;
      line-height: 16px;
      color: #1F2020;
      opacity: 0.4;
    }
    &__close-basket {
      position: absolute;
      top: 32px;
      right: 0;
    }
  }
}
.product-cards-wrapper {
  width: calc(100% - 80px);
  height: calc(100% - 306px);
  overflow: scroll;
  position: relative;
  left: 40px;

  .product-cards {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
  }
  .product-cards > * + * {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
}
.amount {
  &__label {
    position: absolute;
    left: 40px;
    bottom: 76px;
    font-size: 16px;
    line-height: 16px;
  }
  &__number {
    position: absolute;
    left: 40px;
    bottom: 40px;
    font-size: 30px;
    font-weight: 500;
    line-height: 30px;
    letter-spacing: -0.02em;
  }
}
.submit-btn {
  position: absolute;
  width: 240px;
  height: 56px;
  right: 40px;
  bottom: 40px;
  background: #7BB899;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.06em;
  border: none;
  outline: none;
  border-radius: 4px;
}
@media (max-width: 600px) {
  .basket {
    width: 100%;
  }
  .submit-btn {
    width: 180px;
    height: 48px;
  }
}
</style>
