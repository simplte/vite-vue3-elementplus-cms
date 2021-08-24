<template>
  <div id="app-loading-content-circle" />
</template>

<script>
import { defineComponent } from 'vue';

// 圆形
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
$app-layout-menu-width: 255px;
$app-layout-menu-collapsed-width: 80px;
$app-layout-padding: 24px;
$app-layout-header-height: 60px;
$app-layout-content-max-width: 1250px;

#app-loading-content-circle {
  height: $app-layout-menu-collapsed-width;
  width: $app-layout-menu-collapsed-width;
  background-image: linear-gradient(to right, $primary-lightener 25%, $primary-darken);
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0 0 5px $primary-lightener;
  will-change: transform;
  animation: roll 1s linear infinite forwards;

  &::after {
    content: '';
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background: $body-background;
    box-shadow: 0 0 5px $primary-lightener;
  }

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -1px;
    left: -1px;
    bottom: -1px;
    right: -1px;
    border: 5vh solid $body-background;
    border-top: 5vh solid transparent;
    border-radius: 50%;
  }
}

@keyframes roll {
  to {
    transform: rotate(360deg);
  }
}
</style>
