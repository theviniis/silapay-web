import ProductDetails from '@views/ProductDetails.vue';
import ProductForm from '@views/ProductForm.vue';
import ProductList from '@views/ProductList.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: ProductList },
  { path: '/product/:id', component: ProductDetails, props: true },
  { path: '/create', component: ProductForm },
  { path: '/edit/:id', component: ProductForm, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
