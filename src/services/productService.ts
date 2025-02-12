import type { HttpResponse } from '@/@types/HttpResponse';
import type { Pagination } from '@/@types/PaginationData';
import { formatApiError } from '@/lib/utils';
import api from '@lib/api';
import { z } from 'zod';

const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  description: z.string().min(2).max(300),
  price: z.number().positive(),
  createdAt: z.string().transform((value) => new Date(value)),
  updatedAt: z.string().transform((value) => new Date(value)),
});

export type Product = z.infer<typeof productSchema>;

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
      throw new Error(formatApiError(err));
    }
  },

  async getProduct(id: Product['id']) {
    try {
      const { data } = await api.get<HttpResponse<Product>>(`/products/${id}`);
      return data.data;
    } catch (err) {
      throw new Error(formatApiError(err));
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
      throw new Error(formatApiError(err));
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
      throw new Error(formatApiError(err));
    }
  },

  async deleteProduct(id: Product['id']) {
    try {
      const { data } = await api.delete<HttpResponse<Product>>(
        `products/${id}`,
      );
      return data.data;
    } catch (err) {
      throw new Error(formatApiError(err));
    }
  },
};
