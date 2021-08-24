<template>
  <el-button size="mini" @click="edit">编辑</el-button>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: ['row', 'column', 'hidden'],

  emits: ['edit'],

  setup(props, { emit }) {
    const edit = () => emit('edit', props);

    return { edit };
  },
});
</script>
