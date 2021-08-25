<template>
  <FreeException
    class="network-error"
    icon="network"
    title="网络出错"
    description="抱歉，您的网络连接已断开，请检查您的网络！"
  />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NetworkError',
});
</script>

<style lang="scss" scoped>
.network-error {
  &:deep .error-text {
    img {
      width: 400px;
    }

    span {
      margin-top: -40px;
      font-size: 30px;
    }
  }
}
</style>
