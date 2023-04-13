<template>
  <div ref="sliderNav" class="slider-nav flex items-center">
    <div
      v-for="(_, index) in amount"
      :key="index"
      class="navigation-item pointer"
      :class="currentItem === index && 'active-item'"
      @click="$emit('index:update', index)"
    ></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  amount: number;
  currentItem: number;
}>()
const emit = defineEmits<{
  (event: 'index:update', newIndex: number): void
}>()
</script>

<style scoped lang="scss">
.slider-nav {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  box-sizing: content-box;
  gap: 8px;
  padding: 13px 24px;
  .navigation-item {
    width: 6px;
    height: 6px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
  }
  .active-item {
    background: white;
  }
}
@media (max-width: 1280px) {
  .slider-nav {
    padding: 10px 18px;
  }
}
</style>