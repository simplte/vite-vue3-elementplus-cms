<template>
  <div class="demo-page">{{ testData }}</div>
  <div>asdfasdf</div>
  <ElIcon name="el-icon-success" />
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { ElMessageBox, ElMessage, ElForm } from 'element-plus';
export interface TestInter {
  name: string;
  age?: number;
}
export default defineComponent({
  name: 'demo',
  components: {
    ElMessage,
  },
  setup() {
    console.log(123);
    ElMessage.warning('waring');
    let testData = ref<TestInter>({ name: 'ccc demo' });
    return {
      testData,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo-page {
  background-color: $primary-color;
}
</style>