<template>
  <div class="container mx-auto p-4">
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import productService from '@/services/productService';

const route = useRoute();
const product = ref({});

onMounted(async () => {
  product.value = await productService.getProduct(route.params.id);
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
</script>
