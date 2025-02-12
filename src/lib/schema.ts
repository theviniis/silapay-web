import { z } from 'zod';

const nameSchema = z.string().min(2).max(255);

const priceSchema = z.number().positive();

const descriptionSchema = z.string().min(2).max(500);

export const productSchema = z.object({
  id: z.string().uuid(),
  name: nameSchema,
  price: priceSchema,
  description: descriptionSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Product = z.infer<typeof productSchema>;

export const updateProductSchema = z.object({
  name: nameSchema.optional(),
  price: priceSchema.optional(),
  description: descriptionSchema.optional(),
});
