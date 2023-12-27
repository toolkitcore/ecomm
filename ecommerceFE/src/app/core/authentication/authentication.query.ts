import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AuthenticationState, AuthenticationStore } from './authentication.store';

@Injectable()
export class AuthenticationQuery extends QueryEntity<AuthenticationState> {

  userProfile$ = this.select(x => x.userProfile);
  constructor(protected store: AuthenticationStore) {
    super(store);
  }

}
