<template>
  <div class="bg-layer" />
</template>

<style scoped>
.bg-layer {
  z-index: -1;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-image: var(--bg-url);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(3px) brightness(var(--bg-brightness));
  transform: scale(1.05);
  transition: filter 0.5s ease;
}
</style>
