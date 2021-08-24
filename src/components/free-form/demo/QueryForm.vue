<template>
  <el-card style="margin: 24px;">
    <template #header>
      <span>查询用法</span>
    </template>

    父组件：{{ formQuery.model }}

    <free-form
      :label-width="formQuery.labelWidth"
      :model="formQuery.model"
      :fields="formQuery.fields"
      :row="formQuery.row"
    >
      <template #buttons>
        <div style="text-align: right; margin-left: 10px;">
          <el-button type="success" icon="el-icon-edit" @click="setQuery">查询</el-button>
          <el-button type="warning" icon="el-icon-download">导出</el-button>
        </div>
      </template>
    </free-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import FreeForm from '@/components/free-form';

export default defineComponent({
  components: {
    FreeForm,
  },

  setup() {
    const formQuery = reactive({
      labelWidth: 'auto',
      row: { gutter: 10 },
      model: {
        projectId: 1,
        name: '',
        protagonist: '',
        movie: '天下无贼',
        age: '',
      },
      fields: [
        {
          label: '项目',
          prop: 'projectId',
          type: 'select',
          placeholder: '请选择项目',
          col: { span: 6 },
          options: [
            { value: 1, label: '腾讯影业' },
            { value: 2, label: '中国影业' },
          ],
        },
        {
          label: '电影',
          prop: 'movie',
          type: 'input',
          placeholder: '请输入角色名称',
          col: { span: 6 },
        },
        {
          label: '主角',
          prop: 'protagonist',
          type: 'input',
          placeholder: '选输入主角名称',
          col: { span: 6 },
        },
        {
          label: '姓名',
          prop: 'name',
          type: 'input',
          placeholder: '选输入姓名',
          col: { span: 6 },
        },
        {
          label: '年龄',
          prop: 'age',
          type: 'input',
          placeholder: '选输入年龄',
          col: { span: 6 },
        },
      ],
    });

    const setQuery = () => {
      console.log(formQuery.model);
      alert(JSON.stringify(formQuery.model));
    };

    return {
      formQuery,
      setQuery,
    };
  },
});
</script>
