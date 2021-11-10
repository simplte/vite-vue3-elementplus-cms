<template>
  <span class="fullscreen" @click="toggle">
    <FreeIcon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen-line'"></FreeIcon>
  </span>
</template>

<script lang="ts">
import { useFullscreen } from '@vueuse/core';
import { defineComponent } from 'vue';

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
