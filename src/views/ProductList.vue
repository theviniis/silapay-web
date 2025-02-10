<script setup lang="ts">
import { formatCurrency } from '@lib/utils';
import productService from '@services/productService';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/vue-query';
import {
  createColumnHelper,
  getCoreRowModel,
  useVueTable,
  type PaginationState,
  type RowData,
} from '@tanstack/vue-table';
import { type Product } from '@services/productService';
import { h, ref } from 'vue';
import ActionsCell from '@/components/ActionsCell.vue';
import Pagination from '@/components/Pagination.vue';
import ProductsTable from '@/components/ProductsTable.vue';
import ProductsTableHeader from '@/components/ProductsTableHeader.vue';

declare module '@tanstack/vue-table' {
  interface TableMeta<TData extends RowData> {
    handeDeleteProduct: (id: string) => Promise<Product>;
  }
}

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('name', {
    id: 'name',
    cell: (info) => info.getValue(),
    header: 'Name',
  }),
  columnHelper.accessor('description', {
    id: 'description',
    cell: (info) => info.getValue(),
    header: 'Description',
  }),
  columnHelper.accessor('price', {
    id: 'price',
    cell: (info) => formatCurrency(info.getValue()),
    header: 'Price',
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => h(ActionsCell, info),
  }),
];

const products = ref<Product[]>([]);

const pagination = ref<PaginationState>({
  pageIndex: 0,
  pageSize: 20,
});

const fetchProducts = async () => {
  const response = await productService.getProducts({
    ...pagination.value,
  });
  if (response.data.content.length) {
    products.value = response.data.content;
  }
  return response;
};

const { fetchStatus, ...query } = useQuery({
  queryKey: ['products', pagination],
  queryFn: fetchProducts,
  placeholderData: keepPreviousData,
});

const { mutateAsync: handeDeleteProduct } = useMutation({
  mutationFn: productService.deleteProduct,
  onSuccess: () => {
    query.refetch();
  },
});

const table = useVueTable({
  data: products,
  columns,
  state: { pagination: pagination.value },
  manualPagination: true,
  getCoreRowModel: getCoreRowModel(),
  onPaginationChange: (updater) => {
    pagination.value =
      typeof updater === 'function' ? updater(pagination.value) : updater;
  },
  meta: { handeDeleteProduct },
});
</script>

<template>
  <div class="container mx-auto p-4 space-y-4">
    <ProductsTableHeader :is-loading="fetchStatus !== 'idle'" />

    <ProductsTable :table="table" :is-loading="fetchStatus !== 'idle'" />

    <Pagination
      :pageIndex="pagination.pageIndex"
      :totalPages="query.data.value?.data.pagination.totalPages || 0"
      :page-size="pagination.pageSize"
      :onChangePageIndex="table.setPageIndex"
      :onChangePageSize="table.setPageSize"
      :total-elements="query.data.value?.data.pagination.totalElements"
    />
  </div>
</template>
