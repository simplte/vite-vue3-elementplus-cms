<template>
  <div id="app-loading-content-bar">
    <span v-for="(_, index) in bars" :key="index"></span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// 音符跳动
export default defineComponent({
  setup() {
    return {
      bars: new Array(5).fill(''),
    };
  },
});
</script>

<style lang="scss" scoped>
$app-layout-menu-collapsed-width: 80px;
$primary: #0052d9;
$primary-lighten: lighten($primary, 8%);
$primary-lightener: lighten($primary, 20%);
$primary-lightener-extra: lighten($primary, 35%);
$primary-darken: darken($primary, 8%);

#app-loading-content-bar {
  display: flex;
  flex-flow: row wrap;
  width: 60px;
  justify-content: space-between;
  align-items: center;
  transform: translate3d(0, 0, 0);

  span {
    height: 24px;
    width: 6px;
    margin: 0;
    background-color: $primary;
    will-change: transform;

    @mixin loop($n, $i: 1) {
      @if $n>0 {
        @include loop($n - 1, $i - 1);

        &:nth-child(#{$i}) {
          animation: scaleBar 1s linear (0.2s * ($i - 1)) infinite;
        }
      }
    }

    @include loop(6, 6);
  }

  .app-loading-content-text {
    width: $app-layout-menu-collapsed-width;
    font-size: 14px;
  }
}

@keyframes scaleBar {
  0% {
    transform: scaleY(1);
  }

  25% {
    transform: scaleY(1.4);
  }

  50% {
    transform: scaleY(1);
  }

  75% {
    transform: scaleY(0.6);
  }

  100% {
    transform: scaleY(1);
  }
}
</style>
