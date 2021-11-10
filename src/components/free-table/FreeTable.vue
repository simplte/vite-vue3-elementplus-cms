<template>
  <div class="free-table">
    <el-table ref="tableRef" :data="data" v-bind="$attrs">
      <template v-for="column in tbColumns">
        <el-table-column v-if="column.slot" v-bind="column" :key="column.prop">
          <template #default="scope">
            <slot :name="column.prop" v-bind="scope"></slot>
          </template>
        </el-table-column>

        <free-column v-else :key="column.prop" :column="column" />
      </template>

      <template #empty>
        <slot v-if="$slots.empty" name="empty"></slot>
        <el-empty v-else description="暂无数据"></el-empty>
      </template>

      <template #append>
        <slot name="append"></slot>
      </template>
    </el-table>

    <template v-if="pagination">
      <free-pagination v-if="data.length > 0 && $attrs.total" v-bind="$attrs" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import FreePagination from '@/components/free-pagination';

import FreeColumn from './FreeColumn.vue';

export interface ColumnItem {
  label: string;
  prop: string;
  children?: Array<ColumnItem>;
  [key: string]: unknown;
}

type ColumnProps = Partial<ColumnItem>;

export default defineComponent({
  components: {
    FreePagination,
    FreeColumn,
  },

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    column: {
      type: Array as PropType<ColumnItem[]>,
      default: () => [],
    },
    columnProps: {
      type: Object as PropType<ColumnProps>,
      default: () => ({}),
    },
    pagination: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const tbColumns = computed(() => {
      const { column, columnProps } = props;
      return column.map((col) => Object.assign({}, columnProps, col));
    });

    return {
      tbColumns,
    };
  },
});
</script>
