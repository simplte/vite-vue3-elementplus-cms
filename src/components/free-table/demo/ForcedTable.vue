<template>
  <el-card style="margin: 24px">
    <template #header>
      <span>selection/index/expand用法</span>
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
      {
        label: '更多',
        prop: 'expand',
        type: 'expand',
        render: (scope) => {
          return (
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="姓名">
                <span>{scope.row.name}</span>
              </el-form-item>
              <el-form-item label="地址">
                <span>{scope.row.address}</span>
              </el-form-item>
              <el-form-item label="日期">
                <span>{scope.row.date}</span>
              </el-form-item>
              <el-form-item label="邮编">
                <span>{scope.row.zip}</span>
              </el-form-item>
              <el-form-item label="标签">
                <el-tag>{scope.row.tag}</el-tag>
              </el-form-item>
            </el-form>
          );
        },
      },
      {
        label: '选择',
        prop: 'selection',
        type: 'selection',
      },
      {
        label: '序号',
        prop: 'index',
        type: 'index',
      },
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

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
