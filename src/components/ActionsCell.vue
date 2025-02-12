<script setup lang="ts">
import type { Product } from '@/services/productService';
import type { CellContext } from '@tanstack/vue-table';
import Button from './Button.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import productService from '@/services/productService';

const props = defineProps<CellContext<Product, unknown>>();

const queryClient = useQueryClient();

const { mutateAsync: handeDeleteProduct, isIdle } = useMutation({
  mutationFn: productService.deleteProduct,
  onSuccess: () => {
    const result = confirm('Are you sure you want to delete this product?');
    if (!result) return;
    queryClient.invalidateQueries({ queryKey: ['products'] });
  },
});
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
      :disabled="!isIdle"
      @click="handeDeleteProduct(props.row.original.id)"
    >
      Delete
    </Button>
  </div>
</template>
