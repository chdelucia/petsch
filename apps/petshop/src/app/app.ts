import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcher } from './components/language-switcher';
import { ChNavbar } from '@petsch/ui';

@Component({
  imports: [RouterModule, LanguageSwitcher, ChNavbar],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
