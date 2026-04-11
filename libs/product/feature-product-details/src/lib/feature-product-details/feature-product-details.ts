import { Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Button, CartDrawer, CartItem } from '@petsch/ui';
import { Pet, CurrentTransitionService } from '@petsch/api';
import { PetOfTheDayStore } from '@petsch/pet-of-the-day-data-access';

@Component({
  selector: 'lib-feature-product-details',
  standalone: true,
  imports: [CommonModule, Button, CartDrawer, CartItem],
  templateUrl: './feature-product-details.html',
  styleUrl: './feature-product-details.css',
})
export class FeatureProductDetails {
  protected readonly transitionService = inject(CurrentTransitionService);
  private readonly router = inject(Router);
  protected readonly potdStore = inject(PetOfTheDayStore);

  id = input.required<string>();
  product = input.required<Pet>();

  showPotdDrawer = signal(false);

  loading = () => false;
  error = () => null;

  buttonText = computed(() => {
    return this.potdStore.isPetAddedToday()
      ? 'Ver la mascota del día'
      : 'Add as pet of the day';
  });

  handlePotdClick() {
    if (this.potdStore.isPetAddedToday()) {
      this.showPotdDrawer.set(true);
    } else {
      this.potdStore.addPet(this.product());
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
