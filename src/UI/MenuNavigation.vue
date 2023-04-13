<template>
  <nav class="nav flex">
    <div
      v-for="item in menuItems"
      :key="item.name"
      class="menu-item"
      @click="navigateTo(item.path)"
    >
      {{ item.name }}
    </div>
  </nav>
</template>

<script setup lang="ts">
export interface MenuItem {
  name: string;
  path: string;
}
const menuItems: MenuItem[] = [
  {
    name: 'Продукты',
    path: '/'
  },
  {
    name: 'Цвета',
    path: '/'
  },
  {
    name: 'Вдохновение',
    path: '/'
  },
  {
    name: 'Советы',
    path: '/'
  },
  {
    name: 'Найти магазин',
    path: '/'
  }
]

const navigateTo = (path: string) => {
  // логика для навигации
}

</script>

<style scoped>
.nav {
  gap: 24px;
}
.menu-item {
  width: fit-content;
  font-size: 14px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
}
</style>