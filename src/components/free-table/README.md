---
title: FreeTable 表格
---

### 介绍

基于`Element-Plus Table`二次封装，几乎支持原 table 所有的功能

**特性**

- 继承 `Element-Plus Table` 组件的参数及事件
- 支持 `render` 渲染
- 支持 `slot` 插槽
- 支持 `component` 组件引入
- 支持 `tree` 树形数据

## 代码演示

### 基础用法

用法参考 `demo/BasicTable.vue`

```html
<template>
  <free-table :data="data" :column="column"></free-table>
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
```

### Slot 用法

通过设置 `slot: true` 属性，可以使用插槽方式自定义编辑表格`table-column`的内容，用法参考 `demo/SlotTable.vue`

```html
<free-table :data="data" :column="column">
  <template #tag="scope">
    <el-tag>{{ scope.row.tag }}</el-tag>
  </template>
</free-table>
```

```js
const column = ref([
  { label: '日期', prop: 'name' },
  { label: '姓名', prop: 'date', sortable: true },
  { label: '地址', prop: 'address', width: 300 },
  { label: '邮编', prop: 'zip' },
  { label: '标签', prop: 'tag', slot: true },
]);
```

### Render 用法

通过 `render` 属性，渲染编辑表格`table-column`的内容，使用`render`函数, `vue`文件中的`script lang`必须是`jsx 或者 tsx`，用法参考 `demo/RenderTable.vue`

```html
<free-table :data="data" :column="column" />
```

```js
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
  },
]);
```

### component 用法

通过 `component` 属性，添加组件渲染编辑表格`table-column`的内容，使用使用`markRaw` or `shallowRef` 方法，使其值不成为响应式。用法参考 `demo/ComponentTable.vue`, 不太推荐使用组件方式

```html
<template>
  <free-table :data="data" :column="column"></free-table>
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
```

### 操作按钮用法

通过 `operator` 属性，设置操作按钮。继承`el-button`其他属性

| 参数    | 说明         | 类型                                  | 默认值 |
| ------- | ------------ | ------------------------------------- | ------ |
| action  | 按钮操作类型 | _String_                              | -      |
| text    | 按钮文本     | _String_                              | -      |
| click   | 按钮事件     | _Funtion(scope, column)_              | `      |
| disable | 按钮是否置灰 | _Boolean_ or _Funtion(scope, column)_ | -      |
| hidden  | 按钮是否隐藏 | _Boolean_ or _Funtion(scope, column)_ | -      |

```html
<free-table :data="data" :column="column" />
```

```js
const column = ref([
  { label: '日期', prop: 'name' },
  { label: '姓名', prop: 'date', sortable: true },
  { label: '地址', prop: 'address', width: 300 },
  { label: '邮编', prop: 'zip' },
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
          return row.date === '2016-05-02';
        },
      },
      {
        action: 'delete',
        hidden: ({ row }) => row.date === '2016-05-02',
      },
      { action: 'export' },
      { action: 'import', text: '上传' },
    ],
  },
]);
```

更多用法请看 `demo`

## API

### Props

只是在 `Element Table` 封装了一层，原本设置在 `Table` 上的 `props` 与事件监听和设置都可以直接绑定到组件上，具体配置可参考 `Element Tabel` 文档

| 参数          | 说明                             | 类型     | 默认值 |
| ------------- | -------------------------------- | -------- | ------ |
| data          | `table` 的 `data` 属性           | _Array_  | `[]`   |
| column        | 用于控制表格列渲染               | _Array_  | `[]`   |
| columns-props | 用于定义所有 `column` 公共的属性 | _Object_ | -      |

#### column

| 参数      | 说明                      | 类型        | 默认值  |
| --------- | ------------------------- | ----------- | ------- |
| label     | 表格列标题                | _String_    | -       |
| prop      | 表格列属性值名称          | _String_    | -       |
| slot      | 插槽渲染                  | _Boolean_   | `false` |
| render    | `render` 函数渲染         | _Function_  | -       |
| component | 组件模式渲染              | _Component_ | -       |
| event     | 事件监听（组件模式渲染 ） | _Object_    | -       |
| props     | 组件属性（组件模式渲染 ） | _Object_    | -       |
