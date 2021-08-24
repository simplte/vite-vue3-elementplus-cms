<template>
  <div class="app-layout">
    <app-header />
    <main class="app-layout-main">
      <div class="app-layout-content">
        <div class="app-layout">
          <section class="app-content">
            <router-view class="app-container" />
          </section>
          <app-footer />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppHeader from './components/header/Header.vue';
import AppFooter from './components/footer/Footer.vue';

export default defineComponent({
  name: 'BlankLayout',

  components: {
    AppHeader,
    AppFooter,
  },

  setup() {
    return {};
  },
});
</script>

<style lang="scss">
@import './styles/layout.scss';
</style>

<style lang="scss" scoped>
.app-layout-content {
  padding-left: 0 !important;
}
</style>
