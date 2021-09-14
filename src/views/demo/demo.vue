<template>
  <div class="demo-page">{{ testData }}</div>
  <div>asdfasdf</div>
  <ElIcon name="el-icon-success" />
  <div @click="jumpTable()">table</div>
  <div @click="jumpForm()">form</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
export interface TestInter {
  name: string;
  age?: number;
}
export default defineComponent({
  name: 'Demo',
  components: {},
  setup() {
    const router = useRouter();
    console.log(123);
    ElMessage.warning('waring');
    const jumpTable = () => {
      console.log('table');
      router.push('/demoTable');
    };
    const jumpForm = () => {
      router.push('/demoForm');
    };
    let testData = ref<TestInter>({ name: 'ccc demo' });
    return {
      testData,
      jumpTable,
      jumpForm,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo-page {
  background-color: $primary-color;
}
</style>
