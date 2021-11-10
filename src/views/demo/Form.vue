<template>
  <div class="app-container">
    <BasicForm />
    <QueryForm />
  </div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';

import BasicForm from '@/components/free-form/demo/BasicForm.vue';
import QueryForm from '@/components/free-form/demo/QueryForm.vue';

export default defineComponent({
  components: {
    BasicForm,
    QueryForm,
  },

  setup() {
    return {};
  },
});
</script>
