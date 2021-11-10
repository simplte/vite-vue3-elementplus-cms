<template>
  <div class="app-layout" :class="classObj">
    <app-header />
    <main class="app-layout-main">
      <app-siderbar />
      <div class="app-layout-content">
        <div class="app-layout">
          <app-breadcrumb />
          <section class="app-content">
            <router-view />
          </section>
          <app-footer />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import { useStore } from '@/store';

import AppBreadcrumb from './components/breadcrumb/Breadcrumb.vue';
import AppFooter from './components/footer/Footer.vue';
import AppHeader from './components/header/Header.vue';
import AppSiderbar from './components/siderbar/Siderbar.vue';

export default defineComponent({
  name: 'BasicLayout',

  components: {
    AppHeader,
    AppFooter,
    AppSiderbar,
    AppBreadcrumb,
  },

  setup() {
    const store = useStore();
    const collapsed = computed(() => store.state.app.sidebarCollapsed);

    const classObj = computed(() => {
      return {
        hideSidebar: !collapsed.value,
        openSidebar: collapsed.value,
      };
    });

    return { collapsed, classObj };
  },
});
</script>

<style lang="scss">
@import './styles/layout.scss';
</style>
