import { InjectionToken } from '@angular/core';
import { IPetService } from './pet.repository';

export const PET_TOKEN = new InjectionToken<IPetService>('PET');
