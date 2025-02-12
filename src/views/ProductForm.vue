<script setup>
import productService from '@/services/productService';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { updateProductSchema } from '@lib/schema';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import TextArea from '@/components/TextArea.vue';
import InputCurrency from '@/components/InputCurrency.vue';
import { ZodError } from 'zod';
import { formatZodError } from '@/lib/utils';

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
    const result = await updateProductSchema.parseAsync(form.value);

    if (editMode.value) {
      await productService.updateProduct(route.params.id, form.value);
    } else {
      await productService.createProduct(form.value);
    }

    router.push('/');
  } catch (err) {
    if (err instanceof ZodError) {
      alert(formatZodError(err));
    } else alert(err.message);
  }
};

const { mutateAsync: handleSubmit, isPending } = useMutation({
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
        <Input
          v-model="form.name"
          id="name"
          type="text"
          placeholder="Product name"
          class="input input-bordered w-full max-w-xs"
          label="Name"
          :required="editMode ? false : true"
        />

        <InputCurrency
          label="Price"
          v-model="form.price"
          id="price"
          type="number"
          step="0.01"
          placeholder="0.00"
          :required="editMode ? false : true"
          :options="{ currency: 'USD', valueRange: { min: 0 } }"
        />

        <TextArea
          label="Description"
          v-model="form.description"
          id="description"
          rows="3"
          placeholder="Product description"
          :required="editMode ? false : true"
        ></TextArea>

        <div class="flex justify-end space-x-4">
          <Button theme="secondary">
            <router-link to="/">Cancelar</router-link>
          </Button>
          <Button type="submit" :isLoading="isPending">Salvar</Button>
        </div>
      </form>
    </div>
  </div>
</template>
