import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Pet, PET_TOKEN } from '@petsch/api';

export const petResolver: ResolveFn<Pet> = (route) => {
  const productService = inject(PET_TOKEN);
  const id = route.paramMap.get('id')!;
  return productService.getDetails(id);
};
