<template>
  <el-table-column v-bind="column">
    <template #default="scope">
      <!-- render -->
      <free-render v-if="column.render" :scope="scope" :render="column.render" />

      <!-- component -->
      <component
        :is="column.component"
        v-if="column.component"
        v-bind="getComponentAttr(scope, column)"
      />

      <!-- 嵌套表格 -->
      <template v-if="column.children">
        <free-column
          v-for="(col, index) in column.children"
          :key="col.prop || index"
          :column="col"
        />
      </template>

      <!-- operator -->
      <template v-if="column.operator">
        <free-button :scope="scope" :column="column" :operator="column.operator" />
      </template>
    </template>
  </el-table-column>
</template>

<script>
import { defineComponent, watchEffect } from 'vue';
import FreeRender from '@/components/free-render';
import CellForced from './CellForced';
import FreeButton from './FreeButton.vue';
export default defineComponent({
  components: {
    FreeRender,
    FreeButton,
  },

  props: {
    column: {
      type: Object,
      default: () => ({}),
    },
  },

  setup(props) {
    const renderColumn = () => {
      const { column } = props;
      // 多选：selection / 索引：index / 展开的按钮：expand
      if (column.type) {
        if (column.renderHeader) {
          column.renderHeader = column.renderHeader || CellForced[column.type].renderHeader;
        }
        column.render = column.render || CellForced[column.type].renderCell;
      }

      // 格式化内容
      if (column.formatter) {
        column.render = (scope) => {
          if (scope?.column?.formatter) {
            return scope.column.formatter(
              scope.row,
              scope.column,
              scope.row[scope.column.property],
              scope.$index
            );
            // return (
            //   <span>
            //     {scope.column.formatter(
            //       scope.row,
            //       scope.column,
            //       scope.row[scope.column.property],
            //       scope.$index
            //     )}
            //   </span>
            // );
          }
          return null;
        };
      }

      // 渲染成text
      if (!column.render) {
        column.render = (scope) => {
          if (scope?.row) {
            return scope.row[scope.column.property];
            // return <span>{scope.row[scope.column.property]}</span>;
          }
          return null;
        };
      }

      return column;
    };

    const getComponentAttr = ({ row, column }, col) => {
      const props = { row, col, column, ...col.event, ...col.props };
      return props;
    };

    watchEffect(() => renderColumn());

    return {
      getComponentAttr,
    };
  },
});
</script>
