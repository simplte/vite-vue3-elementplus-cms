<template>
  <el-card style="margin: 24px">
    <template #header>
      <span>组件用法</span>
    </template>
    <free-table :data="data" :column="column"></free-table>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, markRaw, ref } from 'vue';

import FreeTable from '@/components/free-table';

import EditBtn from './components/EditBtn.vue';
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
      {
        label: '操作',
        prop: 'cmp',
        component: markRaw(EditBtn), // or shallowRef(EditBtn)
        event: {
          onEdit: (row) => console.log('edit', row),
        },
        props: {
          hidden: true,
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
