<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index">
      <span
        v-if="item.redirect === 'noRedirect' || index == breadcrumbs.length - 1"
        class="no-redirect"
      >
        {{ item.meta && item.meta.title }}
      </span>
      <a v-else @click.prevent="toLink(item)">{{ item.meta && item.meta.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, watch } from 'vue';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import { compile } from 'path-to-regexp';

export type RouteProps =
  | RouteRecordRaw
  | {
      path: string;
      meta: Record<string, unknown>;
      redirect?: string;
    };

export default defineComponent({
  setup() {
    const breadcrumbs: Ref<RouteProps[]> = ref([]);
    const router = useRouter();
    const route = useRoute();
    const getBreadcrumb = () => {
      const { matched } = router.currentRoute.value;

      const nestedRoutes = matched.filter(
        (item) => item.meta?.title && item.meta?.hideBreadcrumb !== false
      );

      breadcrumbs.value = nestedRoutes.map((item) => {
        if (typeof item.redirect === 'function') {
          return Object.assign({}, item, { redirect: item.redirect(router.currentRoute.value) });
        }
        return item;
      });
    };

    const pathCompile = (path: string) => {
      const toPath = compile(path);
      return toPath(route.params);
    };

    const toLink = (route) => {
      const { redirect, path } = route;
      if (redirect) {
        router.push(redirect);
        return;
      }
      router.push(pathCompile(path));
    };

    watch(
      () => router.currentRoute.value,
      (route) => {
        if (route.path.startsWith('/redirect/')) {
          return;
        }
        getBreadcrumb();
      }
    );

    onMounted(getBreadcrumb);

    return {
      breadcrumbs,
      toLink,
    };
  },
});
</script>

<style lang="scss">
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
  line-height: 30px;
  padding: 10px 24px;

  &:first-child {
    .el-breadcrumb__inner a {
      font-weight: 700;
      color: #909399;
    }
  }

  .no-redirect {
    cursor: text;
    font-size: 16px;
    font-weight: 700;
    color: var(--color-title-black);
  }
}
</style>
