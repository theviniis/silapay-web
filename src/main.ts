import router from '@lib/router';
import { createApp } from 'vue';
import App from './App.vue';
import { VueQueryPlugin } from '@tanstack/vue-query';
import './style.css';

createApp(App).use(router).use(VueQueryPlugin).mount('#app');
