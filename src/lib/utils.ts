import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatApiError(err: any): string {
  if (err instanceof AxiosError) {
    const _err = err as AxiosError<{ message: string[] }>;
    if (!_err.response?.data.message) return '';
    if (Array.isArray(_err.response.data.message)) {
      return _err.response?.data.message.map((msg) => `• ${msg}`).join(';\n');
    } else {
      return `• ${_err.response.data.message}`;
    }
  }
  return '';
}

export function formatZodError(err: any): string {
  if (err instanceof ZodError) {
    return err.errors
      .map((err) => `• Field ${err.path.join('.')}: ${err.message}`)
      .join(';\n');
  }
  return '';
}
