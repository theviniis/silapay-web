<script setup lang="ts">
import Label from './Label.vue';

type TextAreaProps = {
  id: string;
  label: string;
  modelValue: string;

  required?: boolean;
  placeholder?: string;
};

const props = defineProps<TextAreaProps>();
</script>
<template>
  <div>
    <Label :id="props.id" :required="props.required">
      {{ props.label }}
    </Label>
    <textarea
      class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :placeholder="props.placeholder"
      :required="props.required"
      :value="modelValue"
      v-bind="$attrs"
    ></textarea>
  </div>
</template>
