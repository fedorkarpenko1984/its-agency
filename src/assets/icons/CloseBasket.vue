<template>
  <div class="wrapper">
    <svg class="pos-absolute" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle opacity="0.1" cx="24" cy="24" r="23.5" stroke="black"/>
    </svg>
    <svg class="pos-absolute cross" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </div>
</template>
<style scoped>
.wrapper {
  position: absolute;
  width: 48px;
  height: 48px;
}
.pos-absolute {
  position: absolute;
}
.cross {
  top: 13px;
  left: 13px;
}
</style>