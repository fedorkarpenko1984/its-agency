<template>
  <div
    class="button flex items-center justify-center pointer"
    :class="size || ''"
  >
    <div v-if="type === 'add'" class="vertical-line"></div>
    <div class="horizontal-line"></div>
  </div>
</template>

<script setup lang="ts">
type TAddRemoveButtonType = 'add' | 'remove'
type TAddRemoveButtonSize = 'big' | 'small'

interface Props {
  type?: TAddRemoveButtonType;
  size?: TAddRemoveButtonSize;
}

withDefaults(defineProps<Props>(),{
  type: 'add',
  size: 'small'
})
</script>

<style scoped lang="scss">
.big {
  width: 80px !important;
  height: 32px !important;
  .vertical-line {
    width: 2px;
    height: 12px;
    position: absolute;
    background: #1F2020;
  }
  .horizontal-line {
    height: 2px;
    width: 12px;
    position: absolute;
    background: #1F2020;
  }
}
.button {
    width: 40px;
    height: 24px;
    border-radius: 8px;
    background: #F2F2F2;
    .vertical-line {
      height: 9px;
      width: 2px;
      position: absolute;
      background: #1F2020;
    }
    .horizontal-line {
      width: 9px;
      height: 2px;
      position: absolute;
      background: #1F2020;
    }
  }
.big {
  &:hover {
    background: #7BB899;
  }
}
@media (max-width: 992px) {
  .big {
    width: 40px !important;
    height: 24px !important;
    &:hover {
      background: #F2F2F2;
    }
  }
  .add-button {
    width: 40px;
    height: 24px;
    &__vertical-line {
      height: 9px;
    }
    &__horizontal-line {
      width: 9px;
    }
  }
//   .button-with-hover {
//     &:hover {
//     background: #7BB899;
//   }
// }
}
</style>