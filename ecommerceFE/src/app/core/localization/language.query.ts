import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { LanguageState, LanguageStore } from './language.store';

@Injectable()
export class LanguageQuery extends QueryEntity<LanguageState> {

  constructor(protected store: LanguageStore) {
    super(store);
  }

}
