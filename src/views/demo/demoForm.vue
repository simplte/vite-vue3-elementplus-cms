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
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="选择时间"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="form.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
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
      router.push('/demo/table');
    };
    let testData = ref<TestInter>({ name: 'ccc demo' });
    return {
      testData,
      jumpTable,
      form,
    };
  },
});
</script>

<style lang="scss" scoped>
.demo-page {
  background-color: $primary-color;
}
</style>
