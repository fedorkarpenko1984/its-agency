<template>
  <div class="basket-icon flex items-center justify-center">
    {{ amount }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  amount: number;
}>()
</script>

<style scoped>
.basket-icon {
  position: absolute;
  width: 24px;
  height: 24px;
  background: #7BB899;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0.06em;
  border-radius: 50%;
}
</style>