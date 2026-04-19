import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LanguageSwitcher } from './components/language-switcher';

@Component({
  imports: [RouterModule, LanguageSwitcher],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'dragonball';
}
