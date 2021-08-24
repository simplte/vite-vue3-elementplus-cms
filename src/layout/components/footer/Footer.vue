<template>
  <footer class="app-footer">
    <div class="app-footer-copyright">
      <p>
        <a href="javascript:;"></a>
      </p>
      <p class="copyright"></p>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',

  setup() {
    const fullYear = computed(() => new Date().getFullYear());

    return { fullYear };
  },
});
</script>
<style lang="scss">
.app-footer {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex: 0 0 auto;
  text-align: center;
  height: var(--layout-footer-height);

  &-copyright {
    font-size: 13px;
    margin-bottom: 20px;

    a {
      color: #c0c4cc;
    }

    p {
      margin: 5px 0;
      color: #c0c4cc;
    }
  }
}
</style>
