<template>
  <div id="app-loading-content-angle">
    <span class="angle-border border-1"></span>
    <span class="angle-border border-2"></span>
    <span class="angle-border border-3"></span>
    <div class="angle-content">
      <div class="angle-content-bg"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

// 三角形
export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
$primary: #0052d9;
$primary-lighten: lighten($primary, 8%);
$primary-lightener: lighten($primary, 20%);
$primary-lightener-extra: lighten($primary, 35%);
$primary-darken: darken($primary, 8%);

#app-loading-content-angle {
  height: 60px;
  width: 60px;
  position: relative;

  .angle-border {
    border: 1.5px solid $primary;
    width: 36px;
    display: inline-block;
    position: absolute;
    will-change: transform;

    &.border-1 {
      top: 0;
      left: 12px;
      animation: border-1 2s cubic-bezier(0.28, 1.21, 0.98, 0.93) infinite;
    }

    &.border-2 {
      transform: rotate(60deg);
      top: 40px;
      left: -14px;
      animation: border-2 2s cubic-bezier(0.28, 1.21, 0.98, 0.93) infinite;
    }

    &.border-3 {
      transform: rotate(-60deg);
      top: 40px;
      left: 38px;
      animation: border-3 2s cubic-bezier(0.28, 1.21, 0.98, 0.93) infinite;
    }
  }

  .angle-content {
    position: absolute;
    top: 12px;
    will-change: transform;

    .angle-content-bg {
      border: 30px solid transparent;
      border-top: 52px solid $text-color-secondary;
      transform-origin: 50% 22px;
      animation: content-bg 2s cubic-bezier(0.28, 1.21, 0.98, 0.93) forwards infinite;
    }
  }
}

@keyframes content-bg {
  0% {
    transform: scale(1) rotate(0deg);
    border-top: 52px solid $text-color-secondary;
  }

  45%,
  50% {
    transform: scale(0.6) rotate(180deg);
    border-top: 52px solid $heading-color;
  }

  85%,
  100% {
    transform: scale(1) rotate(360deg);
    border-top: 52px solid $text-color-secondary;
  }
}

@keyframes border-1 {
  0% {
    transform: translateY(0);
  }

  40%,
  50% {
    transform: translateY(-10px);
  }

  90%,
  100% {
    transform: translateY(0);
  }
}

@keyframes border-2 {
  0% {
    transform: rotate(60deg) translateY(0);
  }

  40%,
  50% {
    transform: rotate(60deg) translateY(10px);
  }

  90%,
  100% {
    transform: rotate(60deg) translateY(0);
  }
}

@keyframes border-3 {
  0% {
    transform: rotate(-60deg) translateY(0);
  }

  40%,
  50% {
    transform: rotate(-60deg) translateY(10px);
  }

  90%,
  100% {
    transform: rotate(-60deg) translateY(0);
  }
}
</style>
