<template>
  <div class="filter-pad">
    <div class="close-button-wrapper justify-center">
      <div class="close-button" @click="$emit('filters:hide')"></div>
    </div>
    <div class="toggles-wrapper">
      <toggle
        v-for="(filter, index) in filters"
        :key="filter.name"
        class="pointer"
        :filter="filter"
        @toggle="toggleHandler(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Toggle from '@/UI/Toggle.vue'
import { IFilter } from '@/types/IFilter'
import { ref } from 'vue'

const props = defineProps<{
  filters: IFilter[]
}>()

const emit = defineEmits<{
  (event: 'filter:add', payload: string): void,
  (event: 'filter:remove', payload: string): void,
  (event: 'filters:hide'): void,
}>()

const isFilterActive = ref<boolean[]>((new Array(props.filters.length)).fill(false))
const toggleHandler = (index: number) => {
  isFilterActive.value[index] = !isFilterActive.value[index]
  if (isFilterActive.value[index]) {
    emit('filter:add', props.filters[index].name)
  } else {
    emit('filter:remove', props.filters[index].name)
  }

}
</script>

<style scoped lang="scss">
.close-button-wrapper {
  display: none;
}
.toggles-wrapper {
  width: 250px;
  height: fit-content;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(autofill, 1fr);
  row-gap: 10px;
  padding-left: 64px;
}
@media (max-width: 992px) {
  .toggles-wrapper {
    padding-left: 32px;
  }
}
@media (max-width: 768px) {
  .filter-pad {
    width: 100%;
    height: 100%;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    background: white;
    overflow: hidden;
  }
  .close-button-wrapper {
    display: flex;
    height: 54px;
    width: 100%;
    .close-button {
      position: absolute;
      top: 12px;
      width: 24px;
      height: 4px;
      border-radius: 4px;
      background: #1F2020;
      opacity: 0.6;
    }
  }
}
</style>