<template>
  <el-card style="margin: 24px">
    <template #header>
      <span>FreeIcon组件</span>
    </template>
    <div style="font-size: 14px">具体使用说明，请查看FreeIcon/README.md</div>
    <ul class="icon-list usage-list">
      <li>
        <span>
          <FreeIcon name="light" />
          <span class="icon-name">支持Svg Icon</span>
        </span>
      </li>
      <li>
        <span>
          <FreeIcon name="el-icon-success" />
          <span class="icon-name">支持Element Icon</span>
        </span>
      </li>
      <li>
        <span>
          <FreeIcon name="https://www.flaticon.com/svg/static/icons/svg/3468/3468081.svg" />
          <span class="icon-name">支持图片链接</span>
        </span>
      </li>
    </ul>
  </el-card>

  <el-card style="margin: 24px">
    <template #header>
      <span>Svg Icon图标</span>
    </template>
    <ul class="icon-list">
      <li v-for="icon in icons" :key="icon">
        <span>
          <FreeIcon :name="icon" />
          <span class="icon-name">{{ icon }}</span>
        </span>
      </li>
    </ul>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import FreeIcon from '../FreeIcon.vue';

const icons: string[] = [];
// const requireComponents = require.context('@/assets/svg', false, /.svg$/);

// requireComponents.keys().forEach((fileName) => {
//   const name = fileName.replace(/^\.\/(.+)\.svg$/, '$1');
//   icons.push(name);
// });

const requireIconList: string[] = [
  'excel',
  'fullscreen-exit',
  'fullscreen-line',
  'funnel',
  'light',
  'pdf',
  'ppt',
  'settings',
  'word',
];
requireIconList.forEach((fileName) => {
  const name = fileName.replace(/^\.\/(.+)\.svg$/, '$1');
  icons.push(name);
});

export default defineComponent({
  components: {
    FreeIcon,
  },

  setup() {
    return {
      icons,
    };
  },
});
</script>

<style lang="scss" scoped>
.icon-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 !important;
  overflow: hidden;
  list-style: none;
  border: 1px solid #eaeefb;
  border-radius: 4px;
}

.icon-list li {
  display: flex;
  flex-basis: 10.051%;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: 13px;
  color: #666;
  text-align: center;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.icon-list li:nth-child(10n) {
  border-right: none;
}

.icon-list li .free-icon {
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
  color: #606266;
  transition: color 0.15s linear;
}

.icon-list li .icon-name {
  display: block;
  height: 1em;
  padding: 0 3px;
}

.icon-list li span {
  line-height: normal;
  color: #99a9bf;
  transition: color 0.15s linear;
}

.usage-list li {
  flex-basis: 33.33333%;
}

.usage-list li:nth-child(3) {
  border-right: none;
}
</style>
