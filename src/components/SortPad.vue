<template>
  <div class="wrapper" @click="$emit('setsort', actualSort)">
    <div ref="sortPad" class="sort-pad">
      <div 
        class="sort-pad__item sort-pad__item-active" 
        @click="$emit('setsort', actualSort)"
      >
        {{ actualSort.title }}
      </div>
      <div
        v-for="sort in nonActualSorts"
        :key="sort.title"
        class="sort-pad__item"
        @click="$emit('setsort', sort)"
      >
        {{ sort.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ISort } from '@/types/ISort'
import { onMounted, onUnmounted, ref } from 'vue';
const props = defineProps<{
  actualSort: ISort;
  sorts: ISort[];
  coords: number[];
}>()

const emit = defineEmits<{
  (event: 'setsort', payload: ISort): void
}>()

const nonActualSorts = props.sorts.filter(sort => sort.type !== props.actualSort.type)

const sortPad = ref<null | HTMLElement>(null)

onMounted(() => {
  document.body.style.overflow = 'hidden'
  sortPad.value!.style.top = props.coords[1] + 'px'
  sortPad.value!.style.left = props.coords[0] + 'px'
})
onUnmounted(() => document.body.style.overflow = 'scroll')
</script>

<style scoped lang="scss">
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 5000;
}
.sort-pad {
  position: absolute;
  &__item {
    width: 280px;
    height: 48px;
    font-size: 12px;
    font-weight: 500;
    line-height: 48px;
    letter-spacing: 0.06em;
    background: white;
    padding-left: 24px;
  }
  &__item-active {
    background: #7BB899;
  }
}
</style>