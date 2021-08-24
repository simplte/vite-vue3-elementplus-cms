<template>
  <el-submenu v-if="menuItem.children && menuItem.children.length" :index="menuItem.path">
    <template #title>
      <free-icon v-if="menuItem?.meta?.icon" :name="menuItem?.meta?.icon" />
      <span class="menu-item-title">{{ menuItem.meta?.title }}</span>
    </template>

    <template v-for="submenuItem in menuItem.children" :key="submenuItem.path">
      <siderbar-item :menu-item="submenuItem" />
    </template>
  </el-submenu>

  <el-menu-item v-else :index="menuItem.path">
    <free-icon v-if="menuItem?.meta?.icon" :name="menuItem?.meta?.icon" />
    <template #title>
      <span class="menu-item-title">{{ menuItem.meta?.title }}</span>
    </template>
  </el-menu-item>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SiderbarItem',

  props: {
    menuItem: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
:deep.free-icon {
  visibility: visible;
  width: initial;
  height: initial;

  svg.svg-icon {
    color: inherit;
    width: unset;
    height: unset;
  }
}
</style>
