<template>
  <div class="demo-page">{{ testData }}</div>
  <div>asdfasdf</div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue';
export interface TestInter {
  name: string;
  age?: number;
}
export default defineComponent({
  name: 'demo',
  setup() {
    console.log(123);
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