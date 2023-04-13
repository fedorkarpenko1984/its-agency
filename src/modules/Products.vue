<template>
  <div class="products flex">
    <div
      ref="filterPad"
      class="products__filter-pad-wrapper"
      @click="filtersShowHideHandler"
    >
      <filter-pad
        class="products__filter-pad"
        :filters="filters"
        @filter:add="filtersState.add($event)"
        @filter:remove="filtersState.delete($event)"
        @filters:hide="filtersShowHideHandler"
        @click.stop
      />
    </div>
    <div class="products__cards-wrapper flex">
      <div ref="sortAndInfo" class="products__sort-and-info flex">
        <span class="products__sort-and-info__info">
          {{ productsAmountTextHelper(sortedFilteredProducts.length) }}
        </span>
        <span
          class="products__sort-and-info__filters-label"
          @click="filtersShowHideHandler"
        >
          ФИЛЬТРЫ
        </span>
        <span
          class="products__sort-and-info__sort-label"
          @click="showSortPadHandler($event)"
        >
          {{ actualSort.title }}
        </span>
        <transition name="fade">
          <sort-pad
            :sorts="sorts"
            :actual-sort="actualSort"
            :coords="sortPadCoords"
            v-if="isSortPadShowing"
            @setsort="setSortHandler($event)"
          />
        </transition>
      </div>
      <div ref="productCards" class="product-cards">
        <product-card
          v-for="(product, index) in sortedFilteredProducts"
          :key="product.id"
          :product="product"
          :border="index < withBordersIndex"
          @product:add="basketStore.addProduct(product)"
        />
      </div>
    </div>
</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import FilterPad from '@/components/FilterPad.vue'
import ProductCard from '@/components/ProductCard.vue'
import SortPad from '@/components/SortPad.vue'
import { IProduct } from '@/types/IProduct'
import { ISort } from '@/types/ISort'
import { getDynamicWidthHeper } from '@/helpers/getDynamicWidthHelper'
import { filtrationHelper } from '@/helpers/filtrationHelper'
import { sortingHelper } from '@/helpers/sortingHelper'
import { productsAmountTextHelper } from '@/helpers/productsAmountTextHelper'
import { withBordersIndexHelper } from '@/helpers/withBordersIndexHelper'
import { filters } from '../constants/filters'
import { sorts } from '../constants/sorts'
import { useBasketStore } from '@/store/basketStore'

const props = defineProps<{
  productsUrl: string;
}>()

const basketStore = useBasketStore()

const filtersState = ref<Set<string>>(new Set())
const products = ref<IProduct[]>([])
const productCards = ref<null | HTMLElement>(null)
const sortAndInfo = ref<null | HTMLElement>(null)
const filterPad = ref<null | HTMLElement>(null)
const isSortPadShowing = ref<boolean>(false)
const actualSort = ref<ISort>(sorts[0])
const sortPadCoords = ref<number[]>([])

const showSortPadHandler = (event: Event) => {
  isSortPadShowing.value = true
  const target = event.target as HTMLElement
  sortPadCoords.value[0] = target.getBoundingClientRect().x + 
    target.getBoundingClientRect().width + 13 - 280
  sortPadCoords.value[1] = target.getBoundingClientRect().y - 17
}

const setSortHandler = (newSort: ISort) => {
  isSortPadShowing.value = false
  actualSort.value = newSort
}

const sortedProducts = ref<IProduct[]>([])
watch(actualSort, () => {
  sortedProducts.value = sortingHelper(products.value, actualSort.value)
  sortedFilteredProducts.value = filtrationHelper(sortedProducts.value, filtersState.value)
})

const sortedFilteredProducts = ref<IProduct[]>([])
watch(filtersState.value, () => {
  sortedFilteredProducts.value = filtrationHelper(sortedProducts.value, filtersState.value)
})

const withBordersIndex = ref<number>(0)
watch(sortedFilteredProducts, () => {
  withBordersIndex.value = withBordersIndexHelper(
    sortedFilteredProducts.value.length,
    productCards.value!
  )
})

let isFilterShow = false
function filtersShowHideHandler() {
  if (!isFilterShow) {
    filterPad.value!.style.display = 'block'
    document.body.style.overflow = 'hidden'
  }
  if (isFilterShow) {
    filterPad.value!.style.display = 'none'
    document.body.style.overflow = 'scroll'
  }
  isFilterShow = !isFilterShow
}

const setCardsBoxWidthAndBorderIndex = () => {
  productCards.value!.style.width = getDynamicWidthHeper() + 'px'
  window.innerWidth >= 768
    ? sortAndInfo.value!.style.width = getDynamicWidthHeper() + 'px'
    : sortAndInfo.value!.style.width = window.innerWidth - 48 + 'px'
  withBordersIndex.value = withBordersIndexHelper(
    sortedFilteredProducts.value.length,
    productCards.value!
  )
}

onMounted(async () => {
  setCardsBoxWidthAndBorderIndex()
  window.addEventListener('resize', setCardsBoxWidthAndBorderIndex)
  try {
    const response = await fetch(props.productsUrl)
    products.value = await response.json()
    sortedFilteredProducts.value = (await products.value).sort((prev: IProduct, next: IProduct) => next.price - prev.price)
    sortedProducts.value = await sortedFilteredProducts.value
  } catch(e) {
    console.error(e)
  }
})
onUnmounted(() => window.removeEventListener('resize', setCardsBoxWidthAndBorderIndex))
</script>

<style scoped lang="scss">
.products {
  width: 100%;
  position: relative;
  padding-top: 72px;
  padding-bottom: 135px;
  &__filter-pad-wrapper {
    width: 300px;
  }
  &__sort-and-info {
    width: calc(100% - 48px);
    justify-content: space-between;
    margin-bottom: 44px;
    font-family: Inter;
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    letter-spacing: 0.06em;
    &__filters-label {
      display: none;
      cursor: pointer;
    }
    &__sort-label {
      position: relative;
      margin-right: 13px;
      cursor: pointer;
      &::after {
        content: "▼";
        position: absolute;
        right: -13px;
        top: -2px;
        transform: scaleY(0.5);
      }
    }
  }
  &__cards-wrapper {
    width: calc(100% - 48px);
    flex-direction: column;
    align-items: center;
    .product-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, 278px);
      column-gap: 24px;
      row-gap: 16px;
    }
  }
}
@media (max-width: 992px) {
  .products {
    padding-top: 48px;
    padding-bottom: 20px;
    &__filter-pad-wrapper {
      width: 250px;
    }
    &__cards-wrapper {
      width: calc(100% - 270px);
      .product-cards {
        display: grid;
        grid-template-columns: repeat(auto-fill, 156px);
        column-gap: 15px;
        row-gap: 16px;
        margin: 0 auto;
      }
    }
  }
}
@media (max-width: 768px) {
  .products {
    &__filter-pad-wrapper {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 100vw;
      z-index: 4000;
      background: rgba(0, 0, 0, 0.7);
      display: none;
    }
    &__filter-pad {
      position: absolute;
      top: 160px;
    }
    &__sort-and-info {
      width: calc(100% - 48px);
      justify-content: space-between;
      margin-bottom: 44px;
      font-family: Inter;
      font-size: 12px;
      font-weight: 500;
      line-height: 15px;
      letter-spacing: 0.06em;
      &__filters-label {
        display: inline;
      }
      &__info {
        display: none;
      }
    }
      &__cards-wrapper {
      width: 100%;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
  opacity: 1;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transition: opacity 1s;
}
@keyframes filters-show {
  0%{}
  100%{}
}
</style>
