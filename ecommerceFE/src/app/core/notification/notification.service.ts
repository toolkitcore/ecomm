import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumberNewNotification } from './notification.model';
import { NotificationStore } from './notification.store';

@Injectable()
export class NotificationService {

  constructor(private notificationStore: NotificationStore, private http: HttpClient) {
  }

  receiveNewNotification(message: any) {
    this.getNewNotification().subscribe();
    this.notificationStore.update({ newNotification: message });
  }

  getNewNotification() {
    return this.http.get<NumberNewNotification>('api/notification/new-notification').pipe(
      tap(res => this.notificationStore.update({ newNotification: res.numberNotification }))
    );
  }
}
