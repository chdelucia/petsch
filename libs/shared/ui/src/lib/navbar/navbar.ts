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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChNavbar {
  currentApp = input.required<string>();
  isMenuOpen = signal(false);

  private isLocal =
    typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1');

  // Refactored to a computed signal to ensure memoization and
  // efficient change detection in a zoneless environment.
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
