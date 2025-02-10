<script setup>
import productService from '@/services/productService';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { updateProductSchema } from '@lib/schema';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import Button from '@/components/Button.vue';

const route = useRoute();
const router = useRouter();
const editMode = computed(() => !!route.params.id);
const queryClient = useQueryClient();

const form = ref({
  name: '',
  price: 0,
  description: '',
});

onMounted(async () => {
  if (editMode.value) {
    const product = await productService.getProduct(route.params.id);
    form.value = { ...product };
  }
});

const handleMutateProduct = async () => {
  try {
    const result = await updateProductSchema.safeParseAsync(form.value);

    if (!result.success) throw new Error('Invalid form data');

    if (editMode.value) {
      await productService.updateProduct(route.params.id, result.data);
    } else {
      await productService.createProduct(result.data);
    }

    router.push('/');
  } catch (err) {
    alert(err.message);
  }
};

const { mutateAsync: handleSubmit, isIdle } = useMutation({
  mutationFn: handleMutateProduct,
  onSuccess: queryClient.invalidateQueries({ queryKey: ['products'] }),
});
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold mb-6">
        {{ editMode ? 'Editar' : 'Novo' }} Produto
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nome
          </label>
          <input
            v-model="form.name"
            id="name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
            Preço
          </label>
          <input
            v-model="form.price"
            id="price"
            type="number"
            step="0.01"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="description"
          >
            Descrição
          </label>
          <textarea
            v-model="form.description"
            id="description"
            rows="3"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div class="flex justify-end space-x-4">
          <Button theme="secondary">
            <router-link to="/">Cancelar</router-link>
          </Button>
          <Button type="submit" :isLoading="!isIdle">Salvar</Button>
        </div>
      </form>
    </div>
  </div>
</template>
