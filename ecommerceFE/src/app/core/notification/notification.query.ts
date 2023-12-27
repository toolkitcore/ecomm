import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { NotificationStore, NotificationState } from './notification.store';

@Injectable()
export class NotificationQuery extends QueryEntity<NotificationState> {
  newNotification$ = this.select(x => x.newNotification);
  numberNewNotification$ = this.select(x => x.newNotification);
  constructor(protected store: NotificationStore) {
    super(store);
  }

}
