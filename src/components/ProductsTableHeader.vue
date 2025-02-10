<script setup lang="ts">
import Button from './Button.vue';

const { isLoading = false } = defineProps<{ isLoading?: boolean }>();
</script>
<template>
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">Products List</h1>
    <Button :isLoading="isLoading">
      <router-link to="/create">+ New product</router-link>
    </Button>
  </div>
</template>
