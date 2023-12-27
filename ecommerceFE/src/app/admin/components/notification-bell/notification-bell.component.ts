import { NotificationQuery } from './../../../core/notification/notification.query';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss']
})
export class NotificationBellComponent implements OnInit {
  data = [1, 2, 3, 4];
  numberNewNotification$ = this.notificationQuery.numberNewNotification$;
  constructor(
    private readonly notificationQuery: NotificationQuery
  ) { }

  ngOnInit(): void {
    //TODO: implement something
    console.log();
  }

}
