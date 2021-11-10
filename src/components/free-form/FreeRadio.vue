<template>
  <el-radio-group v-bind="$attrs">
    <el-radio v-for="(item, index) in options" :key="item.id || index" :label="item.value">
      <free-render v-if="render" :scope="item" :render="render" />
      <template v-else>{{ item.label }}</template>
    </el-radio>
  </el-radio-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import FreeRender from '@/components/free-render';

import { OptionItem } from './type';

export default defineComponent({
  components: {
    FreeRender,
  },

  props: {
    render: Function,
    options: {
      type: Array as PropType<OptionItem[]>,
      default: () => [],
    },
  },
});
</script>
