<template>
  <div class="pagination-container">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-bind="$attrs"
      :layout="layout"
      :total="total"
      :page-sizes="pageSizes"
      :background="background"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'FreePagination',

  props: {
    total: {
      type: Number,
      default: 0,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 30, 50],
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['pagination', 'update:page', 'update:limit'],

  setup(props, { emit }) {
    const currentPage = computed({
      get: () => props.page,
      set: (val) => {
        emit('update:page', val);
      },
    });

    const pageSize = computed({
      get: () => props.limit,
      set: (val) => {
        emit('update:limit', val);
      },
    });

    const handleSizeChange = (val: number) => {
      emit('pagination', { page: currentPage, limit: val });
    };

    const handleCurrentChange = (val: number) => {
      emit('pagination', { page: val, limit: pageSize });
    };

    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
  text-align: right;
}
</style>
