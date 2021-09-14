<template>
  <div>
    <div class="demo-page">{{ testData }}</div>
    <div>asdfasdf</div>
    <ElIcon name="el-icon-success" />
    <div @click="jumpTable()">table</div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
    <el-input-number
      v-model="num"
      :min="1"
      :max="10"
      label="描述文字"
      @change="handleChange"
    ></el-input-number>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
export interface TestInter {
  name: string;
  age?: number;
}
export interface RegionType {
  value: string;
  label: string;
  disabled?: Boolean;
}
export default defineComponent({
  name: 'Demo',
  components: {},
  setup() {
    const router = useRouter();
    const regionArr = ref<RegionType[]>([
      {
        value: '选项1',
        label: '黄金糕',
      },
      {
        value: '选项2',
        label: '双皮奶',
        disabled: true,
      },
      {
        value: '选项3',
        label: '蚵仔煎',
      },
      {
        value: '选项4',
        label: '龙须面',
      },
      {
        value: '选项5',
        label: '北京烤鸭',
      },
    ]);
    const regionVal = ref<string>('选项4');
    let form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      resource: '',
      desc: '',
    });

    const jumpTable = () => {
      router.push('/demoTable');
    };
    let testData = ref<TestInter>({ name: 'ccc demo' });
    const num = ref(1);
    const handleChange = (value) => {
      console.log(value);
    };
    return {
      testData,
      jumpTable,
      form,
      regionArr,
      regionVal,
      num,
      handleChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo-page {
  background-color: $primary-color;
}
</style>
