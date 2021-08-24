---
title: FreePagination 分页
---

### 介绍

`Pagination` 组件主要是基于 `Element-Plus` 的 `el-pagination` 进行了二次封装

## 代码演示

### 基础用法

```html
<free-table
  :total="total"
  v-model:page="params.page"
  v-model:limit="params.limit"
  @pagination="getData"
>
</free-table>
```

## API

### Props

| 参数       | 说明                                          | 类型       | 默认值            |
| ---------- | --------------------------------------------- | ---------- | ----------------- |
| total      | 总条目数                                      | _number_   | -                 |
| page       | 当前页数, `v-model:page` 修饰符               | _number_   | `1`               |
| limit      | 每页显示条目个数，支持 `v-model:limit` 修饰符 | _number_   | `10`              |
| page-sizes | 每页显示个数选择器的选项设置                  | _number[]_ | [10, 20, 30, 50]` |

其它 `Element-Plus` 的 `el-pagination` 支持的属性，它也都支持。详情见[文档](https://element-plus.gitee.io/#/zh-CN/component/pagination)

### Events

| 事件名     | 说明                                | 回调参数     |
| ---------- | ----------------------------------- | ------------ |
| pagination | 当 limit 或者 page 发生改变时会触发 | {page,limit} |
