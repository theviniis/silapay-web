import { AxiosError } from 'axios';
import { ZodError } from 'zod';

export function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function formatError(err: any): string {
  let message = '';

  function formatZodError(err: ZodError) {
    return err.errors
      .map((err) => `• Field ${err.path.join('.')}: ${err.message}`)
      .join(';\n');
  }

  function formatAxiosError(err: AxiosError) {
    const _err = err as AxiosError<{ message: string[] }>;
    if (!_err.response?.data.message) return '';
    if (Array.isArray(_err.response.data.message)) {
      return _err.response?.data.message.map((msg) => `• ${msg}`).join(';\n');
    } else {
      return `• ${_err.response.data.message}`;
    }
  }

  if (err instanceof ZodError) {
    message = formatZodError(err);
  } else if (err instanceof AxiosError) {
    message = formatAxiosError(err);
  }

  return message;
}
