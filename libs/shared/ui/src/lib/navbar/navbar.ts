import { Component, input, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ChButton } from '../button/button';

@Component({
  selector: 'lib-ch-ui-navbar',
  standalone: true,
  imports: [TranslocoModule, ChButton],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class ChNavbar {
  currentApp = input.required<string>();
  isMenuOpen = signal(false);

  apps = [
    { id: 'petshop', name: 'navbar.petshop', url: 'https://petsch.vercel.app/' },
    { id: 'rickymorty', name: 'navbar.rickymorty', url: 'https://rickymorty.vercel.app/' },
    { id: 'dragonball', name: 'navbar.dragonball', url: 'https://dbch.vercel.app/' },
  ];

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }
}
