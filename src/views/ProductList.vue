<script setup lang="ts">
import { formatCurrency, isFetching } from '@lib/utils';
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

const getProducts = async () => {
  const { data, statusCode } = await productService.getProducts({
    ...pagination.value,
  });

  if (statusCode === 200) {
    products.value = data.content;
  }

  return data;
};

const { fetchStatus, data: queryData } = useQuery({
  queryKey: ['products', pagination],
  queryFn: getProducts,
  placeholderData: keepPreviousData,
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
});
</script>

<template>
  <div class="container mx-auto p-4 space-y-4">
    <ProductsTableHeader :is-loading="isFetching(fetchStatus)" />

    <ProductsTable :table="table" :is-loading="isFetching(fetchStatus)" />

    <Pagination
      :pageIndex="pagination.pageIndex"
      :totalPages="queryData?.pagination.totalPages ?? 0"
      :page-size="pagination.pageSize"
      :total-elements="queryData?.pagination.totalElements ?? 0"
      :onChangePageIndex="table.setPageIndex"
      :onChangePageSize="table.setPageSize"
    />
  </div>
</template>
