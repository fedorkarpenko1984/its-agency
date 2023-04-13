<template>
  <div class="flex">
    <div
      class="item pointer"
      @click="breadcrubsHandler('/')"
    >
      ГЛАВНАЯ
    </div>
    <div
      v-for="crumb in breadCrumbs"
      :key="crumb.path"
      class="flex items-center"
    >
      <div class="dot"></div>
      <div
        class="item pointer"
        @click="breadcrubsHandler(crumb.path)"
      >
        {{ crumb.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">import { ref } from 'vue';

const props = defineProps<{
  path: string;
}>()
interface IBreadCrumb {
  path: string;
  title: string;
}

const breadcrubsHandler = (path: string) => {
  // router.push(path)
}
const breadCrumbsDictionary: {
  [key: string]: string
} = {
  'products': 'ПРОДУКТЫ',
  'paints': 'КРАСКИ'
}
let commonPath = '/'

const breadCrumbs = ref<IBreadCrumb[]>(
  props.path.split('/').map(crumb => {
    commonPath = commonPath + crumb
    return {
      path: commonPath,
      title: breadCrumbsDictionary[crumb]
    }
  }).filter(crumb => crumb.path !== '/')
)
</script>

<style scoped>
.item {
  font-size: 10px;
  line-height: 10px;
  letter-spacing: 0.06em;
  color: #FFFFFF;
  opacity: 0.3;
}
.dot {
  width: 3px;
  height: 3px;
  background: white;
  opacity: 0.3;
  margin: 0 8px;
}
@media (max-width: 992px) {
  .item {
    color: #1F2020;
  }
  .dot {
    background: #C4C4C4;
  }
}
</style>