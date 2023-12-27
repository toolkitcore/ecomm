import { Injectable } from '@angular/core';
import { EntityStore, StoreConfig } from '@datorama/akita';

export interface LanguageState {
  language: string;
}

@Injectable()
@StoreConfig({ name: 'language' })
export class LanguageStore extends EntityStore<LanguageState> {

  constructor() {
    super();
  }

}
