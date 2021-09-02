<template>
  <el-card style="margin: 24px">
    <template #header>
      <span>基础用法</span>
    </template>

    <free-form
      ref="formRef"
      label-width="100px"
      :model="form.model"
      :fields="form.fields"
      :show-buttons="true"
    />
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
    const form = reactive({
      model: {
        title: 'tencent',
        type: 1,
        parentID: 1,
      },
      fields: [
        {
          label: '所有项目',
          prop: 'parentID',
          type: 'select',
          placeholder: '请选择项目',
          props: { style: { width: '100%' } },
          options: [
            { value: 1, label: '测试平台' },
            { value: 2, label: '项目管理平台' },
          ],
        },
        {
          label: '名称',
          prop: 'title',
          type: 'input',
          placeholder: '请输入角色名称',
          rules: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
        },
        {
          label: '描述',
          prop: 'description',
          type: 'input',
          placeholder: '选输入角色描述',
          rules: [{ required: true, message: '选输入角色描述', trigger: 'blur' }],
          props: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } },
        },
      ],
    });

    return {
      form,
    };
  },
});
</script>
