import { Component, input, output } from '@angular/core';

export interface LanguageOption {
  code: string;
  label: string;
}

@Component({
  selector: 'lib-ch-ui-language-switcher',
  imports: [],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class ChLanguageSwitcher {
  languages = input.required<LanguageOption[]>();

  selected = input.required<string>();
  languageSelected = output<string>();

  selectLanguage(code: string) {
    this.languageSelected.emit(code);
  }
}
