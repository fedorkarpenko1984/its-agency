<template>
  <div ref="slider" class="slider">
    <arrow
      v-show="currentFrameIndex !== 0"
      class="slider__arrow slider__arrow-left"
      @click="leftArrowHandler"
    />
    <arrow
      v-show="currentFrameIndex !== frames.length - 1"
      class="slider__arrow slider__arrow-right"
      @click="rigthArrowHandler()"
    />
    <slider-frame
      v-for="(frame, index) in frames || []"
      :key="index"
      :frame="frame"
      v-show="frameShowingFlags[index]"
    />
    <div ref="movingFrame" class="slider__moving-frame">
      <slider-frame :frame="frames[currentFrameIndex]" />
    </div>
    <slider-navigation
      :current-item="currentFrameIndex"
      :amount="frames.length"
      class="slider__nav"
      @index:update="sliderNavigationHandler($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SliderFrame from '@/UI/SliderFrame.vue'
import SliderNavigation from '@/UI/SliderNavigation.vue'
import Arrow from '@/assets/icons/Arrow.vue'
import { ISliderFrame } from '@/types/ISliderFrame'

const props = defineProps<{
  frames: ISliderFrame[]
}>()

const slider = ref<null | HTMLElement>(null)
const movingFrame = ref<null | HTMLElement>(null)
const currentFrameIndex = ref<number>(0)
const frameShowingFlags = ref<boolean[]>((new Array(props.frames.length)).fill(false))
frameShowingFlags.value[0] = true

// флаги блокировки кнопок
let isLeftArrowBlocked = false
let isRightArrowBlocked = false
let isSliderNavBlocked = false
// функция анимации
function sliderAnimationHelper(
    prevFrameIndex: number, 
    nextFrameIndex: number
  ): void 
{
  let actionClass: string = ''
  let leftPosition: string = ''
  if (prevFrameIndex < nextFrameIndex) {
    actionClass = 'rigth-arrow-animation'
    leftPosition = '100%'
  } else {
    actionClass = 'left-arrow-animation'
    leftPosition = '-100%'
  }
  movingFrame.value!.style.left = leftPosition
  movingFrame.value!.style.display = 'block'
  movingFrame.value!.classList.add(actionClass)
  setTimeout(() => {
    frameShowingFlags.value[nextFrameIndex] = true
    frameShowingFlags.value[prevFrameIndex] = false
    movingFrame.value!.style.display = 'none'
    movingFrame.value!.classList.remove(actionClass)
    isLeftArrowBlocked = false
    isRightArrowBlocked = false
    isSliderNavBlocked = false
  }, 700)
}
// функция для левой кнопки слайдера
function leftArrowHandler(): void {
  if (isLeftArrowBlocked) return
  isLeftArrowBlocked = true
  const prevFrameIndex = currentFrameIndex.value
  currentFrameIndex.value -= 1
  sliderAnimationHelper(prevFrameIndex, currentFrameIndex.value)
}
// функция для правой кнопки слайдера
function rigthArrowHandler(): void {
  if (isRightArrowBlocked) return
  isRightArrowBlocked = true
  const prevFrameIndex = currentFrameIndex.value
  currentFrameIndex.value += 1
  sliderAnimationHelper(prevFrameIndex, currentFrameIndex.value)
}
// функция для навбара
function sliderNavigationHandler(index: number) : void {
  if (currentFrameIndex.value === index) return
  if (isSliderNavBlocked) return
  isSliderNavBlocked = true
  const prevFrameIndex = currentFrameIndex.value
  currentFrameIndex.value = index
  sliderAnimationHelper(prevFrameIndex, currentFrameIndex.value)
}

</script>

<style scoped lang="scss">
.slider {
  position: absolute;
  width: 100%;
  &__moving-frame {
    position: absolute;
    width: 100%;
    top: 0;
    z-index: 1100;
    display: none;
  }
  &__arrow {
    position: absolute;
    top: 18.43vw;
    padding: 5px;
    background: rgba(128, 128, 128, 0.5);
    backdrop-filter: blur(5px);
    z-index: 1500;
    border-radius: 5px;
    cursor: pointer;
  }
  &__arrow-left {
    left: 21.87vw;
    transform: rotate(180deg);
  }
  &__arrow-right {
    right: 21.87vw;
  }
  &__nav {
    left: 50%;
    transform: translateX(-50%);
    top: 25.46vw;
    z-index: 1200;
    position: absolute;
  }
}

.rigth-arrow-animation {
  animation: toleft 0.7s linear forwards;
}
.left-arrow-animation {
  animation: toright 0.7s linear forwards;
}
@keyframes toleft {
  0% {
    left: 100%;
  }
  100% {
    left: 0;
  }
}
@keyframes toright {
  0% {
    left: -100%;
  }
  100% {
    left: 0;
  }
}
</style>