<template>
  <el-dialog
    v-bind="$attrs"
    :title="title"
    :width="width"
    :before-close="onClose"
    :close-on-click-modal="onCloseModal"
  >
    <slot></slot>
    <template v-slot:footer>
      <span class="dialog-footer" v-if="showFooterButton">
        <el-button icon="el-icon-circle-close" @click="onCancel">{{ cancelText }}</el-button>
        <el-button icon="el-icon-circle-check" type="primary" @click="onConfirm">
          {{ confirmText }}
        </el-button>
      </span>
    </template>
    <slot name="footer"></slot>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FreeDialog',

  emits: ['onConfirm', 'onCancel', 'onClose'],

  props: {
    width: {
      type: String,
      default: '50%',
    },
    title: {
      type: String,
      default: '',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    onCloseModal: {
      type: Boolean,
      default: false,
    },
    showFooterButton: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { emit }) {
    const onConfirm = () => emit('onConfirm');
    const onCancel = () => emit('onCancel');
    const onClose = () => emit('onClose');

    return {
      onConfirm,
      onCancel,
      onClose,
    };
  },
});
</script>
