import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { ChButton, ChBadge } from '@petsch/ui';
import { Pet, CurrentTransitionService } from '@petsch/api';
import { APP_ROUTES } from '@petsch/shared-utils';
import { PetDetailsStore } from './pet-details.store';

@Component({
  selector: 'lib-feature-pet-details',
  imports: [
    CommonModule,
    ChButton,
    ChBadge,
    TranslocoDirective,
    NgOptimizedImage,
  ],
  templateUrl: './feature-pet-details.html',
  styleUrl: './feature-pet-details.css',
  providers: [PetDetailsStore],
})
export class FeaturePetDetails implements OnInit {
  protected readonly transitionService = inject(CurrentTransitionService);
  private readonly router = inject(Router);
  readonly store = inject(PetDetailsStore);

  id = input.required<string>();
  product = input<Pet | null>(null);

  showPotdDrawer = signal(false);

  loading = this.store.loading;
  error = this.store.error;

  ngOnInit() {
    this.store.loadPet(this.id());
  }

  goBack() {
    this.router.navigate([APP_ROUTES.PETS]);
  }
}
