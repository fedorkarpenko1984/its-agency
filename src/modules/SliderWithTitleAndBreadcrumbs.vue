<template>
  <div ref="moduleWrapper" class="module-wrapper">
    <h1 class="title">{{ title }}</h1>
    <bread-crumbs class="breadcrumbs" path="/products/paints" />
    <slider :frames="sliderFrames" class="slider" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect } from 'vue'
import Slider from '@/components/Slider.vue'
import BreadCrumbs from '@/components/BreadCrumbs.vue'
import { ISliderFrame } from '@/types/ISliderFrame'

const props = defineProps<{
  sliderDataUrl: string;
  title: string;
}>()

const sliderFrames = ref<ISliderFrame[]>([])
const moduleWrapper = ref<HTMLElement | null>(null)

const getModuleHeight = () => {
  moduleWrapper.value!.style.height = moduleWrapper.value!.querySelector('.slider-frame')?.clientHeight + 'px'
}

watchEffect(() => {
  if (moduleWrapper.value) getModuleHeight()
})

onMounted(async () => {
  window.addEventListener('resize', getModuleHeight)

  const img = moduleWrapper.value?.querySelector('.slider-frame')?.querySelector('img')
  img?.addEventListener('load', () => {
    getModuleHeight()
  })
  try {
    const response = await fetch(props.sliderDataUrl)
    sliderFrames.value = await response.json()
  } catch (e) {
    console.error()
  }
})
onUnmounted(() => window.removeEventListener('resize', getModuleHeight))

</script>

<style scoped lang="scss">
.module-wrapper {
  width: 100%;
  position: relative;
  .title {
    position: absolute;
    font-size: 72px;
    line-height: 63px;
    font-weight: 400;
    letter-spacing: -0.02em;
    color: white;
    top: 11vw;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1500;
  }
  .breadcrumbs {
    position: absolute;
    top: 32px;
    left: 64px;
    z-index: 1500;
  }
}
@media (max-width: 1280px) {
  .module-wrapper {
    .title {
      font-size: 48px;
    }
  }
}
@media (max-width: 992px) {
  .slider {
    display: none;
  }
  .module-wrapper {
    height: 154px !important;
    .title {
      color: black;
      left: 24px;
      transform: translate(0);
      top: 74px;
    }
    .breadcrumbs {
      top: 16px;
      left: 24px;
    }
  }
}
</style>
