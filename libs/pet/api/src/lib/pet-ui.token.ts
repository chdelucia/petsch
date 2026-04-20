import { InjectionToken } from '@angular/core';

export interface PetUiConfig {
  paginationKeys?: {
    page: string;
    limit: string;
  };
  listRoute?: string;
  hideSort?: boolean;
}

export const PET_UI_CONFIG = new InjectionToken<PetUiConfig>('PET_UI_CONFIG');
