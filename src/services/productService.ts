import type { HttpResponse } from '@/@types/HttpResponse';
import type { Pagination } from '@/@types/PaginationData';
import type { Product } from '@/lib/schema';
import { formatError } from '@/lib/utils';
import api from '@lib/api';

export type GetProductsParams = Pick<Pagination, 'pageIndex' | 'pageSize'> & {
  sort?: `${keyof Product},${'asc' | 'desc'}`;
};

export default {
  async getProducts(params?: GetProductsParams) {
    try {
      const { data } = await api.get<
        HttpResponse<{ content: Product[]; pagination: Pagination }>
      >('/products', {
        params,
      });
      return data;
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async getProduct(id: Product['id']) {
    try {
      const { data } = await api.get<HttpResponse<Product>>(`/products/${id}`);
      return data.data;
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async createProduct(product: Product) {
    try {
      const { data } = await api.post<HttpResponse<Product>>(
        '/products',
        product,
      );
      return data.data;
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async updateProduct(id: Product['id'], product: Product) {
    try {
      const { data } = await api.put<HttpResponse<Product>>(
        `products/${id}`,
        product,
      );
      return data.data;
    } catch (err) {
      throw new Error(formatError(err));
    }
  },

  async deleteProduct(id: Product['id']) {
    try {
      const { data } = await api.delete<HttpResponse<Product>>(
        `products/${id}`,
      );
      return data.data;
    } catch (err) {
      throw new Error(formatError(err));
    }
  },
};
