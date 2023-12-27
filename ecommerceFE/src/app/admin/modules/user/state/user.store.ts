import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { PagingModel } from 'src/app/shared/models/paging.model';
import { User } from 'src/app/shared/models/user.model';

export interface UserState {
  userPaging: PagingModel<User>;
}

export function createInitialState(): UserState {
  return {
    userPaging: {} as PagingModel<User>
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'user', resettable: true })
export class UserStore extends Store<UserState> {

  constructor() {
    super(createInitialState());
  }

}
