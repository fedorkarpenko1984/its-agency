<template>
  <div class="icons-block flex">
    <search-icon class="pointer" />
    <profile-icon class="pointer"/>
    <heart-icon class="pointer" />
  </div>
</template>

<script setup lang="ts">
import HeartIcon from '@/assets/icons/Heart.vue'
import ProfileIcon from '@/assets/icons/Profile.vue'
import SearchIcon from '@/assets/icons/Search.vue'

</script>

<style scoped lang="scss">
.icons-block > * + * {
  margin-left: 24px;
}
.icons-block {
  img {
    width: 22px;
    height: 22px;
  }
}

</style>