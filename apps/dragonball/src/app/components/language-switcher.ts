import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { ChLanguageSwitcher, LanguageOption } from '@petsch/ui';

@Component({
  imports: [ChLanguageSwitcher],
  selector: 'app-lang-switcher',
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  readonly transloco = inject(TranslocoService);
  selectedLanguage = this.transloco.getActiveLang();

  readonly languages: LanguageOption[] = [
    { code: 'en', label: 'En' },
    { code: 'es', label: 'Es' },
  ];

  changeLanguage(code: string) {
    this.transloco.setActiveLang(code);
    this.selectedLanguage = code;
  }
}
