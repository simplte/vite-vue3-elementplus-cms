<template>
  <div :class="animationClassName" :style="{ style }">
    <div class="app-loading-content">
      <BarLoading />
      <p class="app-loading-content-text">{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import BarLoading from './BarLoading.vue';
export default defineComponent({
  name: 'PageLoading',
  components: {
    BarLoading,
  },
  props: {
    class: {
      type: String,
      default: '',
    },
    style: {
      type: Object,
      default: () => ({}),
    },
    text: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const animationClassName = computed(() => ['app-loading-animation', props.class]);
    return {
      animationClassName,
    };
  },
});
</script>
<style lang="scss" scoped>
$app-layout-menu-width: 255px;
$app-layout-menu-collapsed-width: 80px;
$app-layout-padding: 24px;
$app-layout-header-height: 60px;
$app-layout-content-max-width: 1250px;

$component-background: #fff;
$body-background: #f3f3f3;
$navigator-background: #fff;
$popover-background: #fff;
$text-color: rgba(0, 0, 0, 0.6);
$text-color-secondary: rgba(0, 0, 0, 0.45);
$heading-color: rgba(0, 0, 0, 0.85);
$border-color: #f2f2f2;
$shadow-color: rgba(189, 189, 189, 0.6);

// $primary: var(--color-primary);
$primary: #0052d9;
$primary-lighten: lighten($primary, 8%);
$primary-lightener: lighten($primary, 20%);
$primary-lightener-extra: lighten($primary, 35%);
$primary-darken: darken($primary, 8%);

.app-loading-animation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  transform: translate3d(0, 0, 0);

  &::after {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    content: '';
    background-color: $body-background;
    filter: blur(2px);
    opacity: 0.5;
  }

  &.app-loading-hide {
    z-index: -1;
    opacity: 0;
    transition: opacity ease-in-out 0.4s, z-index 0.6s ease 0.1s;
  }

  &.app-loading-fixed {
    position: fixed;
    top: $app-layout-header-height;
    right: 0;
    bottom: 0;
    left: 220px;

    &.app-loading-collapsed {
      left: $app-layout-menu-collapsed-width;
      transition: none;
    }
  }

  .app-loading-content {
    position: absolute;
    top: 50%;
    left: 50%;
    display: flex;
    flex-flow: column;
    align-items: center;
    transform: translate(-50%, -50%);

    .app-loading-content-text {
      display: block;
      margin-top: 20px;
      font-size: 14px;
      color: $primary;
      text-align: center;
      letter-spacing: 2px;
    }
  }
}
</style>
