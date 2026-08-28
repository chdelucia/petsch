import { HttpHeaders } from '@angular/common/http';
import { ApiMapperFn, GetProductsResponse } from '@petsch/api';
import { parseLinkHeader } from './link-header-parser';

export const headerLinkApiMapper: ApiMapperFn<unknown> = (
  body: unknown,
  headers?: HttpHeaders | null,
): GetProductsResponse<unknown> => {
  const products = Array.isArray(body) ? body : [];
  const linkHeader = headers ? headers.get('Link') : null;
  const pagination = linkHeader ? parseLinkHeader(linkHeader) : {};
  return {
    products,
    pagination,
  };
};

export function createNestedApiMapper<T = unknown>(options?: {
  resultsPath?: string;
  pagesPath?: string;
  nextPath?: string;
  prevPath?: string;
}): ApiMapperFn<T> {
  const resultsKey = options?.resultsPath ?? 'results';
  const pagesKey = options?.pagesPath ?? 'info.pages';
  const nextKey = options?.nextPath ?? 'info.next';
  const prevKey = options?.prevPath ?? 'info.prev';

  return (body: unknown): GetProductsResponse<T> => {
    if (!body || typeof body !== 'object') {
      return { products: [], pagination: {} };
    }

    const getNestedVal = (obj: unknown, path: string): unknown => {
      return path.split('.').reduce((acc: unknown, key: string) => {
        if (acc && typeof acc === 'object' && key in acc) {
          return (acc as Record<string, unknown>)[key];
        }
        return undefined;
      }, obj);
    };

    const products = (getNestedVal(body, resultsKey) as T[]) || [];
    const pages = getNestedVal(body, pagesKey) as number | undefined;
    const next = getNestedVal(body, nextKey) as string | undefined;
    const prev = getNestedVal(body, prevKey) as string | undefined;

    return {
      products,
      pagination: {
        ...(pages !== undefined ? { pages } : {}),
        ...(next ? { next } : {}),
        ...(prev ? { prev } : {}),
      },
    };
  };
}

export const dragonballApiMapper: ApiMapperFn<unknown> = (
  body: unknown,
): GetProductsResponse<unknown> => {
  if (Array.isArray(body)) {
    return {
      products: body,
      pagination: { pages: 1 },
    };
  }

  if (body && typeof body === 'object') {
    const obj = body as Record<string, unknown>;
    const products = (obj['items'] as unknown[]) || [];
    const meta = obj['meta'] as Record<string, unknown> | undefined;
    const links = obj['links'] as Record<string, unknown> | undefined;

    return {
      products,
      pagination: {
        pages: (meta?.['totalPages'] as number) || 1,
        next: (links?.['next'] as string) || undefined,
        prev: (links?.['previous'] as string) || undefined,
      },
    };
  }

  return { products: [], pagination: {} };
};
