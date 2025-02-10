<script setup lang="ts">
import Button from './Button.vue';
import { ref } from 'vue';

const {
  totalPages = 0,
  totalElements = 0,
  pageIndex = 0,
  pageSize = 20,
  pageSizeMenu = [
    { value: 20, label: '20' },
    { value: 40, label: '40' },
  ],
  onChangePageSize,
  onChangePageIndex,
} = defineProps<{
  pageIndex: number;
  totalPages: number;
  pageSize: number;
  pageSizeMenu?: { value: number; label: string }[];
  totalElements?: number;
  onChangePageSize: (pageSize: number) => void;
  onChangePageIndex: (pageIndex: number) => void;
}>();

const handleClickPrev = () => {
  onChangePageIndex(pageIndex - 1 < 0 ? 0 : pageIndex - 1);
};

const handleClickForward = () => {
  onChangePageIndex(pageIndex + 1);
};

const selectedPageSize = ref(pageSize);

const handlePageSizeChange = (event: Event) => {
  const newSize = parseInt((event.target as HTMLSelectElement).value, 10);
  selectedPageSize.value = newSize;
  onChangePageSize(newSize);
};
</script>
<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <select v-model="selectedPageSize" @change="handlePageSizeChange">
        <option
          v-for="option in pageSizeMenu"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="flex items-center text-sm gap-2 text-gray-600">
        <p>/ page</p>
        <p class="opacity-20">|</p>
        <p>total {{ totalElements }}</p>
      </div>
    </div>

    <div className="flex items-center space-x-2">
      <Button size="small" @click="handleClickPrev" :disabled="pageIndex === 0">
        <<
      </Button>
      <p>Page {{ pageIndex + 1 }} of {{ totalPages }}</p>
      <Button
        size="small"
        @click="handleClickForward"
        :disabled="pageIndex === totalPages - 1"
      >
        >>
      </Button>
    </div>
  </div>
</template>
