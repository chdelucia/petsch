export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Record<string, string>;
  images: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  slug: string;
  title: string;
  creationAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchTerm?: string;
}

export interface Filters {
  page: number;
  name: string;
  gender: string;
  species: string;
  status: string;
}
