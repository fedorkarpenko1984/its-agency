<template>
  <div class="slider-frame flex justify-center">
    <div v-if="frame?.text" class="slider-frame__text">{{ frame.text }}</div>
    <img class="slider-frame__image" :src="frame?.imgsrc" />
  </div>
</template>

<script setup lang="ts">
import { ISliderFrame } from '@/types/ISliderFrame'
import { onMounted } from 'vue'

defineProps<{
  frame?: ISliderFrame,
}>()
onMounted(() => {
  
})
</script>

<style scoped lang="scss">
.slider-frame {
  width: 100%;
  position: absolute;
  height: fit-content;
  transition: all 1s linear;
  top: 0;
  z-index: 1000;
  &__image {
    width: 100%;
  }
  &__text {
    width: 472px;
    position: absolute;
    font-size: 16px;
    font-weight: 500;
    line-height: 21px;
    letter-spacing: 0.02em;
    text-align: center;
    color: white;
    top: calc(12vw + 73px);
  }
}
@media (max-width: 1280px) {
.slider-frame {
  &__text {
    width: 370px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
}
}
</style>