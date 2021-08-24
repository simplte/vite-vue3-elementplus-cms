---
title: FreeForm 表单
---

### 介绍

基于`Element-Plus`组件库二次封装表单组件

**特性**

- 以 `element-pulus form、form-item` 为基础进行二次封装，减少代码量
- 继承 `element-plus` 表单组件的参数及事件
- 支持 `render` 渲染

**内置组件**

- `FreeSelect` 下拉选择框组，自定义模板支持 `render` 渲染，参考`Element-Plus`[[Select]](https://element-plus.gitee.io/#/zh-CN/component/select)
- `FreeRadio` 单选框组，自定义模板支持 `render` 渲染， 参考`Element-Plus`[[Radio]](https://element-plus.gitee.io/#/zh-CN/component/radio)
- `FreeCheckbox` 多选框组，参考`Element-Plus`[[Checkbox]](https://element-plus.gitee.io/#/zh-CN/component/checkbox)

**组件别名**

```js
export const ComponentNode = {
  select: 'free-select',
  checkbox: 'free-checkbox',
  radio: 'free-radio',
  input: 'el-input',
  timeSelect: 'el-time-select',
  timePicker: 'el-time-picker',
  datePicker: 'el-date-picker',
  inputNumber: 'el-input-number',
  rate: 'el-rate',
  switch: 'el-switch',
};
```

## 代码演示

### 基础用法

```html
<free-form label-width="100px" ref="formRef" :model="form.model" :fields="form.fields" />
```

```js
import { defineComponent, reactive } from 'vue';
import FreeForm from '@/components/FreeForm/Form.vue';

const options = [
  { value: 1, label: '测试平台' },
  { value: 2, label: '项目管理平台' },
];

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
          options,
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
```

## API

### Props

表单整体配置，参考`Element-Plus`[[Form]](https://element-plus.gitee.io/#/zh-CN/component/form)

| 参数        | 说明                                                                                                                          | 类型      | 默认值  |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------- | --------- | ------- |
| row         | 表单组件布局配置, 参考`Element-Plus`[[Row Attributes]](https://element-plus.gitee.io/#/zh-CN/component/layout#row-attributes) | _object_  | -       |
| model       | 表单数据对象                                                                                                                  | _object_  | -       |
| fields      | 表单组件配置, 详情参考`Fields`                                                                                                | _Array_   | `[]`    |
| showButtons | 是否显示按钮组                                                                                                                | _boolean_ | `false` |
| cancelText  | 重置按钮文档                                                                                                                  | _string_  | `重置`  |
| confirmText | 确认按钮的文案                                                                                                                | _string_  | `确认`  |

#### Fields

| 参数           | 说明                                                     | 类型          | 默认值                  |
| -------------- | -------------------------------------------------------- | ------------- | ----------------------- |
| hidden         | 是否隐藏                                                 | _boolean_     | `false`                 |
| type           | 组件类型                                                 | _string_      | -                       |
| label          | 标签文本                                                 | _string_      | -                       |
| prop           | 表单字段                                                 | _string_      | -                       |
| placeholder    | 表单域 `model` 字段，使用描述                            | _string_      | -                       |
| rules          | 表单组件的验证规则                                       | _Array<any>_  | -                       |
| props          | 设置组件的 `props`, 继承`Element-Plus`的组件的参数及事件 | _Object<any>_ | -                       |
| options        | `radio`,`select`,`checkbox` 等组件 `option` 选择项       | _Array<any>_  | `[]`                    |
| size           | 用于控制该表单域下组件的尺寸                             | _size_        | `medium / small / mini` |
| show-message   | 是否显示校验错误信息                                     | _boolean_     | `true`                  |
| inline-message | 以行内形式展示校验信息                                   | _boolean_     | `false`                 |

### Events

| 事件名 | 说明     | 回调参数 |
| ------ | -------- | -------- |
| submit | 提交表单 |          |
| cancel | 重置表单 |          |

### Slots

| 名称    | 说明                     |
| ------- | ------------------------ |
| buttons | 用于表单查询搜索的按钮组 |
