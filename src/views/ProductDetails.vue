<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import productService from '@/services/productService';
import type { Product } from '@/lib/schema';

const route = useRoute();
const product = ref<Product | null>(null);

onMounted(async () => {
  const productId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;
  product.value = await productService.getProduct(productId);
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
</script>

<template>
  <div class="container mx-auto p-4" v-if="product">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-4">Detalhes do Produto</h2>
      <div class="space-y-4">
        <p><span class="font-semibold">Nome:</span> {{ product.name }}</p>
        <p>
          <span class="font-semibold">Preço:</span>
          {{ formatCurrency(product.price) }}
        </p>
        <p>
          <span class="font-semibold">Descrição:</span>
          {{ product.description }}
        </p>
      </div>
      <router-link
        to="/"
        class="mt-6 inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Voltar
      </router-link>
    </div>
  </div>
  <div v-else>
    <p>Carregando...</p>
  </div>
</template>
