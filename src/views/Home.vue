<template>
  <div class="home">
    <img src="@/assets/images/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    // 获取环境变量 {"VITE_APP_BASE_URL":"http://test.api.woa.com","BASE_URL":"/","MODE":"development","DEV":true,"PROD":false,"SSR":false,"LEGACY":false}
    console.log('home import.meta', import.meta);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // console.log('import.meta.env', import.meta.env);
    return {};
  },
});
</script>

<style lang="scss">
.home {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30vh;

  img {
    width: 400px;
    filter: invert(1) sepia(1) saturate(5) hue-rotate(175deg);
  }
}
</style>
