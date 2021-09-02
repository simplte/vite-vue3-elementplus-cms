<template>
  <el-form ref="formRef" :model="model" :rules="rules">
    <el-row v-bind="row">
      <el-col
        v-for="item in fieldItems"
        :key="item.prop"
        v-bind="Object.assign(defaultCol, item.col || {})"
      >
        <el-form-item
          :label="item.label"
          :prop="item.prop"
          :size="item.size"
          :label-width="item.labelWidth"
          :show-message="item.showMessage"
          :inline-message="item.inlineMessage"
          :class="item.className"
        >
          <component
            v-bind="getComponentAttr(item)"
            :is="getComponentNode(item.type)"
            v-model="getModelValue[item.prop]"
          >
            {{ model[item.prop] }}
          </component>
        </el-form-item>
      </el-col>

      <slot name="buttons"></slot>

      <el-col v-if="showButtons">
        <el-form-item class="form-footer">
          <el-button icon="el-icon-circle-close" @click="reset">{{ resetText }}</el-button>
          <el-button icon="el-icon-circle-check" type="primary" @click="submit">
            {{ confirmText }}
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, unref, watchEffect } from 'vue';
import FreeRadio from './FreeRadio.vue';
import FreeSelect from './FreeSelect.vue';
import FreeCheckbox from './FreeCheckbox.vue';
import ElForm from 'element-plus/lib/el-form';

export type Data = { [key: string]: unknown };

export interface FieldItem {
  label: string;
  prop: string;
  type: string;
  props?: Data | null;
  hidden: boolean | false;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: Record<string, any> | Record<string, any>[];
}

export const ComponentNode: Data = {
  select: 'free-select',
  checkbox: 'free-checkbox',
  radio: 'free-radio',
  input: 'el-input',
  timeSelect: 'el-time-select',
  timePicker: 'el-time-picker',
  datePicker: 'el-date-picker',
  inputNumber: 'el-input-number',
  rate: 'el-rate',
  switch: 'el-switch',
};

export default defineComponent({
  name: 'FreeForm',

  components: {
    FreeRadio,
    FreeSelect,
    FreeCheckbox,
  },

  emits: ['reset', 'submit', 'input:update'],

  props: {
    row: Object as PropType<Data>,
    model: {
      type: Object as PropType<Data>,
      default: () => ({}),
    },
    fields: {
      type: Array as PropType<FieldItem[]>,
      default: () => [],
    },
    showButtons: {
      type: Boolean,
      default: false,
    },
    resetText: {
      type: String,
      default: '重置',
    },
    confirmText: {
      type: String,
      default: '提交',
    },
    defaultCol: {
      type: Object,
      /**
       * xl、lg、md、sm、xs响应式布局
       * xl代表宽大于等于1920px
       * lg代表宽大于等于1200px
       * md代表宽大于等于992px
       * sm代表宽大于等于768px
       * xs代表宽小于768px
       * 值含义：24占满整行，12占行一半，8占行三分之一，以此类推
       */
      default: () => ({ xl: 6, lg: 8, md: 11, sm: 24, xs: 24 }),
    },
  },

  setup(props, { emit }) {
    const rules = ref({});
    const formRef = ref<InstanceType<typeof ElForm>>();

    // const getKeyValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key]; // getKeyValue(ComponentNode, 'input')
    const getComponentNode = (key: string) => ComponentNode[key] || key;

    const getModelValue = computed({
      get() {
        return props.model;
      },
      set(value) {
        emit('input:update', value);
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getComponentAttr = (item: Record<string, any>) => {
      return { ...item.props, options: item.options, placeholder: item.placeholder };
    };

    const fieldItems = computed(() => props.fields.filter((item) => !item?.hidden));

    const getRules = (items: FieldItem[]) =>
      items.reduce((r, o) => Object.assign(r, { [o.prop]: o.rules }), {});

    const validate = async () => {
      const form = unref(formRef);
      if (!form) return;
      try {
        await form.validate();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    };

    const reset = () => unref(formRef)?.resetFields() && emit('reset');

    const submit = async () => (await validate()) && emit('submit');

    watchEffect(() => (rules.value = getRules(props.fields)));

    return {
      formRef,
      rules,
      fieldItems,
      reset,
      submit,
      validate,
      getComponentNode,
      getComponentAttr,
      getModelValue,
    };
  },
});
</script>
