<template>
  <span class="fullscreen" @click="toggle">
    <FreeIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen-line'"></FreeIcon>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useFullscreen } from '@vueuse/core';

export default defineComponent({
  name: 'FreeFullscreen',

  setup() {
    const { toggle, isFullscreen } = useFullscreen();
    return {
      toggle,
      isFullscreen,
    };
  },
});
</script>
