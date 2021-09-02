<template>
  <div class="free-button-operator">
    <template v-for="(item, index) in operatorItems" :key="index">
      <el-button v-if="!item.hidden" :key="index" v-bind="item" @click="item.onClick">
        {{ item.text }}
      </el-button>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
export type Fn = () => void;

interface ButtonOperator {
  action: string;
  text: string;
  type?: string;
  size?: string;
  icon?: string;
  onClick?: Fn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const ButtonOperatorMap: ButtonOperator[] = [
  {
    action: 'more',
    type: 'text',
    size: 'small',
    icon: 'el-icon-view',
    class: 'font-color-success',
    text: '查看',
  },
  {
    action: 'edit',
    type: 'text',
    size: 'small',
    icon: 'el-icon-edit',
    text: '编辑',
  },
  {
    action: 'delete',
    type: 'text',
    size: 'small',
    icon: 'el-icon-delete',
    class: 'font-color-danger',
    text: '删除',
  },
  {
    action: 'export',
    type: 'text',
    size: 'small',
    icon: 'el-icon-download',
    class: 'font-color-success',
    text: '导出',
  },
  {
    action: 'import',
    type: 'text',
    size: 'small',
    icon: 'el-icon-upload',
    class: 'font-color-warning',
    text: '导入',
  },
];

export default defineComponent({
  props: {
    scope: Object,
    column: Object,
    operator: {
      type: Array as PropType<ButtonOperator[]>,
      defalut: () => [],
    },
  },

  setup(props) {
    const isFunction = (value: Fn) => typeof value === 'function';

    const operatorItems = computed(() => {
      const { operator, scope, column } = props;
      return operator?.map((item) => {
        const btn = ButtonOperatorMap.find((btn) => btn.action === item.action);

        const disabled = isFunction(item.disabled)
          ? scope && item?.disabled(scope, column)
          : item.disabled;
        const hidden = isFunction(item.hidden) ? scope && item?.hidden(scope, column) : item.hidden;
        const onClick = () => scope && item.click && item?.click(scope, column);

        return { ...btn, ...item, disabled, hidden, onClick };
      });
    });

    return { operatorItems };
  },
});
</script>

<style lang="scss">
// 可以删去重写
.free-button-operator {
  .el-button.is-disabled,
  .el-button.is-disabled:hover,
  .el-button.is-disabled:focus {
    color: #c0c4cc !important;
  }
}
</style>
