export type HealthStatus = 'unhealthy' | 'healthy' | 'very healthy';

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
  health: HealthStatus;
}

export interface Filters {
  _page: number;
  _limit: number;
  _sort: string;
  _order: string;
  name_like: string;
  kind: string;
  weight: number;
  length: number;
  height: number;
}
