<template>
  <el-select v-bind="$attrs" style="width: 100%;">
    <el-option
      v-for="(item, index) in options"
      :key="item.id || index"
      :label="item.label"
      :value="item.value"
    >
      <free-render v-if="render" :scope="item" :render="render" />
    </el-option>
  </el-select>
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
