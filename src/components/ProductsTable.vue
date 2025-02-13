<script setup lang="ts">
import type { Product } from '@/lib/schema';
import { FlexRender, type Table } from '@tanstack/vue-table';

const { table, isLoading } = defineProps<{
  table: Table<Product>;
  isLoading?: boolean;
}>();
</script>

<template>
  <table class="min-w-full bg-white shadow-sm rounded-lg">
    <thead>
      <tr
        v-for="headerGroup in table.getHeaderGroups()"
        :key="headerGroup.id"
        class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal"
      >
        <th
          v-for="header in headerGroup.headers"
          :key="header.id"
          :colSpan="header.colSpan"
          class="py-3 px-6 text-left"
        >
          <FlexRender
            v-if="!header.isPlaceholder"
            :render="header.column.columnDef.header"
            :props="header.getContext()"
          />
        </th>
      </tr>
    </thead>
    <tbody class="text-gray-600 text-sm font-light">
      <!-- Products not found component -->
      <tr v-if="!isLoading && table.getRowModel().rows.length === 0">
        <td :colspan="table.getAllColumns().length" class="py-3 px-6 text-left">
          <div>No products found</div>
        </td>
      </tr>

      <!-- Loading component -->
      <tr v-if="isLoading" class="border-b border-gray-200 hover:bg-gray-100">
        <td :colspan="table.getAllColumns().length" class="py-3 px-6 text-left">
          <div>Loading products</div>
        </td>
      </tr>
      <!-- Table rows -->
      <tr v-else v-for="row in table.getRowModel().rows" :key="row.id">
        <td
          v-for="cell in row.getVisibleCells()"
          :key="cell.id"
          class="py-3 px-6 text-left"
        >
          <FlexRender
            :render="cell.column.columnDef.cell"
            :props="cell.getContext()"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
