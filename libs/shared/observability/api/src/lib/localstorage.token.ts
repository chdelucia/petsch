import { InjectionToken } from '@angular/core';
import { ILocalStorageService } from './localstorage.repository';

export const LOCALSTORAGE_TOKEN = new InjectionToken<ILocalStorageService>(
  'LOCALSTORAGE',
);
