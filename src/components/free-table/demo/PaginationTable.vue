<template>
  <el-card style="margin: 24px">
    <template #header>
      <span>分页功能用法</span>
    </template>
    <free-table
      v-model:page="params.page"
      v-model:limit="params.limit"
      pagination
      :data="tableData"
      :column="column"
      :total="total"
      @pagination="getData"
    ></free-table>
  </el-card>
</template>

<script lang="tsx">
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import FreeTable from '@/components/free-table';
import axios from 'axios';

export default defineComponent({
  components: {
    FreeTable,
  },

  setup() {
    const tableData = ref([]);

    const column = ref([
      { prop: 'title', label: '名称', minWidth: 200 },
      {
        prop: 'author',
        label: '作者',
        render: ({ row }) => {
          return <span>{row?.author?.loginname}</span>;
        },
      },
      { prop: 'tab', label: '类目' },
      { prop: 'reply_count', label: '回复数', width: 100 },
      { prop: 'visit_count', label: '预览量', width: 100 },
    ]);

    const body = reactive({
      total: 0,
      params: {
        tab: 'share',
        page: 1,
        limit: 10,
      },
    });

    const getData = async () => {
      try {
        const url = 'https://cnodejs.org/api/v1/topics';
        const { data } = await axios({ method: 'get', url, params: body.params });
        tableData.value = data.data || [];
        body.total = 500;
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => getData());

    return {
      ...toRefs(body),
      tableData,
      column,
      getData,
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
