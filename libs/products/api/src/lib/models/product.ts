export interface PaginationLinks {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
  total?: number;
  pages?: number;
  current?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
