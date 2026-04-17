export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
  // mapped properties for UI compatibility
  photo_url?: string;
  health?: string;
}

export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface CharactersDto {
  info: Pagination;
  results: Character[];
}

export interface Pagination {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
