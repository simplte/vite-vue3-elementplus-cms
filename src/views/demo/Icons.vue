<template>
  <div class="icons-container">
    <IconsList />
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';

import IconsList from '@/components/free-icon/demo/Icons.vue';

export default defineComponent({
  components: {
    IconsList,
  },

  setup() {
    return {};
  },
});
</script>
