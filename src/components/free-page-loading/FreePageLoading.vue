<template>
  <div :class="animationClassName" :style="{ style }">
    <div class="app-loading-content">
      <BarLoading />
      <p class="app-loading-content-text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import BarLoading from './BarLoading';
export default defineComponent({
  name: 'LoadingAnimation',
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
      default: 'loading...',
    },
  },
  components: {
    BarLoading,
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
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  transform: translate3d(0, 0, 0);
  position: absolute;
  z-index: 999;

  &::after {
    content: '';
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: $body-background;
    opacity: 0.5;
    filter: blur(2px);
    z-index: -1;
  }

  &.app-loading-hide {
    z-index: -1;
    opacity: 0;
    transition: opacity ease-in-out 0.4s, z-index 0.6s ease 0.1s;
  }

  &.app-loading-fixed {
    left: 220px;
    top: $app-layout-header-height;
    bottom: 0;
    right: 0;
    position: fixed;

    &.app-loading-collapsed {
      transition: none;
      left: $app-layout-menu-collapsed-width;
    }
  }

  .app-loading-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-flow: column;
    align-items: center;

    .app-loading-content-text {
      display: block;
      margin-top: 20px;
      font-size: 14px;
      color: $primary;
      letter-spacing: 2px;
      text-align: center;
    }
  }
}
</style>
