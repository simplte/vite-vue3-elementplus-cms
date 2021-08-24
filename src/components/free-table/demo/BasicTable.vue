<template>
  <el-card style="margin: 24px;">
    <template #header>
      <span>基础用法</span>
    </template>
    <free-table :data="data" :column="column"></free-table>
  </el-card>
</template>

<script lang="tsx">
import { defineComponent, ref } from 'vue';
import FreeTable from '@/components/free-table';
import tableData from './tableData';

export default defineComponent({
  components: {
    FreeTable,
  },

  setup() {
    const data = ref(tableData);

    const column = ref([
      { label: '姓名', prop: 'name' },
      { label: '日期', prop: 'date', sortable: true },
      {
        label: '地址',
        prop: 'address',
        width: 300,
        formatter(row, col) {
          return `中国 - ${row[col.property]}`;
        },
      },
      { label: '邮编', prop: 'zip' },
      { label: '标签', prop: 'tag' },
    ]);

    return {
      data,
      column,
    };
  },
});
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
