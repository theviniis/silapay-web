<script setup lang="ts">
import type { Product } from '@/services/productService';
import type { CellContext } from '@tanstack/vue-table';
import Button from './Button.vue';

const props = defineProps<CellContext<Product, unknown>>();
</script>

<template>
  <div class="flex items-center gap-1">
    <Button size="small" theme="success">
      <router-link :to="`/product/${props.row.original.id}`">View</router-link>
    </Button>

    <Button size="small" theme="info">
      <router-link :to="`/edit/${props.row.original.id}`">Edit</router-link>
    </Button>

    <Button
      size="small"
      theme="error"
      @click="table.options.meta?.handeDeleteProduct(props.row.original.id)"
    >
      Delete
    </Button>
  </div>
</template>
