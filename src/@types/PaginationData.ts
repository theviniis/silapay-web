export type Pagination = {
  pageIndex: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
  nextIndex: number | null;
  prevIndex: number | null;
};
