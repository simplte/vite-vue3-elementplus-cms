<template>
  <!-- use element icon -->
  <i v-if="isElIcon" :class="name" class="free-icon"></i>

  <!-- use img icon -->
  <i v-else-if="isImage" class="free-icon" v-on="$attrs">
    <img class="free-icon-img" :src="name" />
  </i>

  <!-- use svg icon -->
  <i class="free-icon" v-on="$attrs">
    <svg-icon :name="name" :style="iconStyle" />
  </i>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import SvgIcon from './SvgIcon.vue';

/**
 * 添加css单位
 * @param {*} value
 */
function addUnit(value: number | string) {
  if (value === undefined || value === null) {
    return undefined;
  }

  return /^\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : value;
}

export default defineComponent({
  name: 'FreeIcon',

  components: {
    SvgIcon,
  },

  props: {
    // 图标名称或者链接
    name: {
      type: String,
    },
    // 仅支持svg格式
    color: String,
    // 图标大小
    size: {
      type: [Number, String],
      default: '',
    },
  },

  setup(props) {
    const iconName = computed(() => `#icon-${props.name}`);

    const isImage = computed(() => props.name?.indexOf('/') !== -1);

    const isElIcon = computed(() => props.name?.indexOf('el-icon') !== -1);

    const iconStyle = computed(() => {
      const size = addUnit(props.size);
      if (isImage.value) {
        return { width: size, height: size };
      }
      return props.color ? { fontSize: size, color: props.color } : { fontSize: size };
    });

    return {
      isElIcon,
      isImage,
      iconName,
      iconStyle,
    };
  },
});
</script>

<style lang="scss">
.free-icon {
  position: relative;
  display: inline-block;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;

  &-img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    object-fit: contain;
  }

  svg.svg-icon {
    fill: currentColor;
    width: 1.4em;
    height: 1.4em;
    vertical-align: middle;
  }
}
</style>
