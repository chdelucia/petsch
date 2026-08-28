import { Injectable, Provider } from '@angular/core';
import {
  GenericProductApi,
  provideGenericProductApi,
  createNestedApiMapper,
} from '@petsch/data-access';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}

export interface CharactersDto {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const rickAndMortyMapper = createNestedApiMapper<Character>({
  resultsPath: 'results',
  pagesPath: 'info.pages',
  nextPath: 'info.next',
  prevPath: 'info.prev',
});

@Injectable()
export class RickAndMortyProductApi<
  T = unknown,
  F = Record<string, unknown>,
> extends GenericProductApi<T, F> {}

export function provideRickAndMortyProductApi(): Provider[] {
  return provideGenericProductApi(rickAndMortyMapper);
}
