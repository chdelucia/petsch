import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { PRODUCT_TOKEN } from '@petsch/api';

export const productResolver: ResolveFn<unknown | null> = (route) => {
  const productService = inject(PRODUCT_TOKEN);
  const id = route.paramMap.get('id')!;
  return productService.getDetails(id).pipe(catchError(() => of(null)));
};
