<template>
  <div class="flex items-center">
    <div
      class="toggle"
      :class="isActive && 'active'"
      @click="toggleHandler"
    >
      <div
        class="toggle__dot"
        :class="isActive && 'toggle__dot-on'"
      >
      </div>
    </div>
    <div v-if="filter.label" class="label">{{ filter.label }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IFilter } from '@/types/IFilter'

defineProps<{
  filter: IFilter
}>()

const emit = defineEmits<{
  (event: 'toggle'): void;
}>()
const isActive = ref<boolean>(false)
const toggleHandler = () => {
  isActive.value = !isActive.value
  emit('toggle')
}
</script>

<style scoped lang="scss">
.toggle {
  position: relative;
  height: 22px;
  width: 36px;
  border-radius: 40px;
  background: #F2F2F2;
  transition: all 0.5s;
  &__dot {
    width: 8px;
    height: 8px;
    background: #1F2020;
    position: absolute;
    top: 7px;
    left: 7px;
    border-radius: 50px;
    transition: all 0.3s;
  }
  &__dot-on {
    left: 21px;
  }
}
.label {
  margin-left: 12px;
}
.active {
  background: #7BB899;
}

</style>