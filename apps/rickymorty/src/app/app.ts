import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcher } from './components/language-switcher';
import { ChNavbar } from '@petsch/ui';

@Component({
  imports: [RouterModule, LanguageSwitcher, ChNavbar],
  selector: 'app-root',
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.css',
})
export class App {
  protected title = 'rickymorty';
}
