<template>
  <el-card style="margin: 24px">
    <template #header>
      <span>树形数据用法</span>
    </template>
    <free-table
      :data="data"
      :column="column"
      row-key="id"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    ></free-table>
  </el-card>
</template>

<script lang="ts">
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
      { label: '日期', prop: 'name' },
      { label: '姓名', prop: 'date', sortable: true },
      { label: '地址', prop: 'address', width: 300 },
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
