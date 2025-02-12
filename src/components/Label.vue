<script setup lang="ts">
type LabelProps = {
  id: string;
  required?: boolean;
};
const props = defineProps<LabelProps>();
</script>

<template>
  <label :for="props.id" class="block text-sm text-gray-500">
    <slot></slot>
    {{ props.required ? '*' : '' }}
  </label>
</template>
