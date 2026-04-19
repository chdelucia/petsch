export const APP_ROUTES = {
  LIST: 'products',
  NOT_FOUND: '404',
} as const;

export const PRODUCT_ROUTES = {
  LIST: 'products',
  DETAILS: ':id',
} as const;
