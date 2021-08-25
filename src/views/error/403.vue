<template>
  <FreeException icon="403" title="403" description="抱歉，您无权限访问此页面" />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotAccess',
});
</script>
