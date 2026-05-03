import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ChButton } from '../button/button';

@Component({
  selector: 'lib-ch-ui-navbar',
  standalone: true,
  imports: [TranslocoModule, ChButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  // Optimization: Use OnPush change detection to minimize change detection cycles
  // in a zoneless environment.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChNavbar {
  currentApp = input.required<string>();
  isMenuOpen = signal(false);

  private readonly isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  // Optimization: Use computed signal for apps to ensure it is only created once
  // and benefits from memoization.
  apps = computed(() => [
    {
      id: 'petshop',
      name: 'navbar.petshop',
      url: this.isLocal
        ? 'http://localhost:4200/'
        : 'https://petsch.vercel.app/',
    },
    {
      id: 'rickymorty',
      name: 'navbar.rickymorty',
      url: this.isLocal
        ? 'http://localhost:4201/'
        : 'https://rickymorty-liard.vercel.app/',
    },
    {
      id: 'dragonball',
      name: 'navbar.dragonball',
      url: this.isLocal
        ? 'http://localhost:4202/'
        : 'https://dbch.vercel.app/',
    },
  ]);

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
