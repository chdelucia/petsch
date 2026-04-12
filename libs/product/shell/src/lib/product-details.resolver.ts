import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Pet, PRODUCT_TOKEN } from '@petsch/api';

export const productResolver: ResolveFn<Pet> = (route) => {
  const productService = inject(PRODUCT_TOKEN);
  const id = route.paramMap.get('id')!;
  return productService.getDetails(id);
};
