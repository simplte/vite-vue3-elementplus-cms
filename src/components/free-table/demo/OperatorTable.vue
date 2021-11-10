<template>
  <el-card style="margin: 24px">
    <template #header>
      <span>行操作按钮用法</span>
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

    const handleEdit = (scope) => {
      console.log(scope);
    };

    const column = ref([
      { label: '姓名', prop: 'name' },
      { label: '日期', prop: 'date', sortable: true },
      { label: '地址', prop: 'address', width: 300 },
      { label: '邮编', prop: 'zip' },
      { label: '标签', prop: 'tag' },
      {
        label: '操作',
        prop: 'operator',
        width: 300,
        operator: [
          { action: 'more', text: '详情', hidden: false, disabled: true },
          {
            action: 'edit',
            click: handleEdit,
            disabled: ({ row }) => {
              return row?.date === '2016-05-02';
            },
          },
          {
            action: 'delete',
            hidden: ({ row }) => row?.date === '2016-05-02',
          },
          { action: 'export' },
          { action: 'import', text: '上传' },
        ],
      },
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
