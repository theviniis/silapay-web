<script setup lang="ts">
import Label from './Label.vue';

interface InputProps {
  id: string;
  label: string;
  modelValue: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

const props = defineProps<InputProps>();
</script>

<template>
  <div>
    <Label :id="props.id" :required="props.required">
      {{ props.label }}
    </Label>
    <input
      class="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      @input="
        $emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :value="modelValue"
      v-bind="$attrs"
    />
  </div>
</template>
