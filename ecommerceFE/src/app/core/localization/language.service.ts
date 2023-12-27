import { Injectable } from '@angular/core';
import { LanguageStore } from './language.store';

@Injectable()
export class LanguageService {

  constructor(private languageStore: LanguageStore) {
  }


  updateLanguage(lang: string): void {
    this.languageStore.update({language: lang});
  }

}
