<template>
  <header class="flex items-center justify-center">
    <div class="content-wrapper flex items-center">
      <logo class="logo" />
      <menu-navigation class="menu-nav" />
      <div class="call-request">
        <div class="call-request__phone-number">+7 (495) 221-77-69</div>
        <div class="call-request__label">Заказать звонок</div>
      </div>
      <icons-block class="icons-block" />
      <basket-icon
        :amount="basketStore.getBasketProductsAmount"
        class="basket-icon pointer"
        @click="$emit('basket:open')"
      />
    </div>
    <div class="burger pointer">
      <div class="burger__line"></div>
      <div class="burger__line"></div>
      <div class="burger__line"></div>
    </div>
  </header>
</template>

<script setup lang="ts">
import Logo from '@/UI/Logo.vue'
import MenuNavigation from '@/UI/MenuNavigation.vue'
import IconsBlock from '@/UI/IconsBlock.vue'
import BasketIcon from '@/UI/BasketIcon.vue'
import { useBasketStore } from '@/store/basketStore'

const basketStore = useBasketStore()

const emit = defineEmits<{
  (event: 'basket:open'): void
}>()
</script>

<style scoped lang="scss">
header {
  width: 100%;
  height: 104px;
  .content-wrapper {
    width: calc(100% - 128px);
    height: 100%;
    position: relative;
    .burger {
      display: none;
    }
    .menu-nav {
      position: absolute;
      left: calc(34px + 14vw);
    }
    .call-request {
      width: fit-content;
      position: absolute;
      right: calc(10vw + 84px);
      &__phone-number {  
        font-size: 16px;
        font-weight: 500;
        letter-spacing: -0.02em;
        }
      &__label {
        font-size: 14px;
        opacity: 0.3;
        margin-top: 2px;
      }
    }
    .icons-block {
      position: absolute;
      right: 48px;
    }
    .basket-icon {
      right: 0;
    }
  }
  .burger {
    display: none;
  }
}
@media (max-width: 1280px) {
  header {
    .content-wrapper {
      width: calc(100% - 64px);
      .call-request {
        display: none;
      }
    }
  }
}
@media  (max-width: 992px) {
  header {
    height: 64px;
    .content-wrapper {
      width: calc(100% - 48px);
      border-bottom: 1px solid rgba(31, 32, 32, 0.6);
      
      .menu-nav {
        display: none;
      }
      .icons-block {
        display: none;
      }
      .logo {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .burger {
      display: block;
      width: 24px;
      height: 14px;
      top: 25px;
      left: 24px;
      position: absolute;
      &__line {
        width: 24px;
        height: 2px;
        background: #1F2020;
      }
    }
    .burger > * + * {
      margin-top: 4px;
    }
  }
}
</style>