<script>
import { useCurrencyInput } from 'vue-currency-input';
import Label from './Label.vue';

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object,
    label: String,
    id: String,
    required: Boolean,
    placeholder: String,
    disabled: Boolean,
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);
    return { inputRef };
  },
};
</script>

<template>
  <Label :for="id" :required="required">{{ label }}</Label>
  <input
    class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
    ref="inputRef"
    type="text"
    :id="id"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
  />
</template>
