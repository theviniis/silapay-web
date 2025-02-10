<script setup lang="ts">
import { cva } from 'class-variance-authority';
import { defineProps } from 'vue';

interface ButtonProps {
  size?: 'medium' | 'small';
  theme?: 'success' | 'info' | 'error' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
}

const button = cva('rounded cursor-pointer text-white transition-colors', {
  variants: {
    theme: {
      info: 'bg-blue-500 hover:bg-blue-700',
      success: 'bg-green-500 hover:bg-green-700',
      error: 'bg-red-500 hover:bg-red-700',
      secondary: 'bg-gray-500 hover:bg-gray-700',
    },
    size: {
      small: 'py-1 px-3',
      medium: 'py-2 px-4 font-bold',
      large: 'py-3 px-6 font-bold',
    },
    disabled: {
      true: 'opacity-70 cursor-not-allowed pointer-events-none',
    },
  },
});

const {
  size = 'medium',
  theme = 'info',
  disabled = false,
  isLoading = false,
} = defineProps<ButtonProps>();
</script>

<template>
  <button
    :class="button({ size, theme, disabled: isLoading || disabled })"
    :disabled="isLoading || disabled"
  >
    <p v-if="isLoading">Loading...</p>
    <slot v-else></slot>
  </button>
</template>
