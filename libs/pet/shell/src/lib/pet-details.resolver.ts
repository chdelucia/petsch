import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, of } from 'rxjs';
import { PET_TOKEN } from '@petsch/api';

export const petResolver: ResolveFn<any | null> = (route) => {
  const productService = inject(PET_TOKEN);
  const id = route.paramMap.get('id')!;
  return productService.getDetails(id).pipe(catchError(() => of(null)));
};
