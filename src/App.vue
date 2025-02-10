<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-lg">
      <div class="container mx-auto px-4 py-3">
        <router-link to="/" class="text-xl font-bold text-gray-800"
          >Produtos</router-link
        >
      </div>
    </nav>

    <router-view class="mt-8" />
  </div>
</template>
