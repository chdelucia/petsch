export interface Pet {
  id: number;
  name: string;
  description: string;
  length: number;
  kind: string;
  photo_url: string;
  weight: number;
  height: number;
  number_of_lives?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Filters {
  page: number;
  name: string;
  kind: string;
  weight: number;
  length: number;
  height: number;
}
