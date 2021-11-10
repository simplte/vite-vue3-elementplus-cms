<template>
  <div class="demo-page">{{ testData }}</div>
  <div>asdfasdf</div>
  <ElIcon name="el-icon-success" />
  <input v-model="keyBoardVal" />
  {{ keyBoardVal }}
  <div @click="jumpForm()">form</div>
</template>
<script lang="ts">
import { ElMessage } from 'element-plus';
import { customRef, defineComponent, ref } from 'vue';
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
    const jumpForm = () => {
      router.push({ path: '/demo/form' });
    };
    let testData = ref<TestInter>({ name: 'ccc demo' });
    let keyBoardVal = useDebounce('');

    return {
      testData,
      jumpForm,
      keyBoardVal,
    };
  },
});
// 不确定类型所以这里使用泛型
function useDebounce<T>(value: T, delay = 200) {
  let timeout;
  return customRef((track, trigger) => {
    return {
      get() {
        // 告诉Vue追踪数据
        track();
        return value;
      },
      set(newVal: T) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          value = newVal;
          // 告诉Vue去触发界面更新
          trigger();
        }, delay);
      },
    };
  });
}
</script>

<style lang="scss" scoped>
.demo-page {
  background-color: $primary-color;
}
</style>
