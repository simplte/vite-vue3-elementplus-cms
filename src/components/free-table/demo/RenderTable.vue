<template>
  <el-card style="margin: 24px;">
    <template #header>
      <span>Render用法</span>
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
      { label: '日期', prop: 'name' },
      { label: '姓名', prop: 'date', sortable: true },
      { label: '地址', prop: 'address', width: 300 },
      { label: '邮编', prop: 'zip' },
      {
        label: '标签',
        prop: 'tag',
        render: (scope) => {
          return <el-tag type="success">{scope.row.tag}</el-tag>;
        },
        renderHeader: ({ column }) => {
          return (
            <el-tooltip content="此项使用render函数渲染">
              <span>
                {column.label}
                <i class="el-icon-warning" style="vertical-align: middle;"></i>
              </span>
            </el-tooltip>
          );
        },
      },
    ]);

    return {
      data,
      column,
    };
  },
});
</script>
