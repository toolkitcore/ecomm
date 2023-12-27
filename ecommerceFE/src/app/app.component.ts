import { NotifyEvent } from './core/const/notify-event';
import { NotificationQuery } from './core/notification/notification.query';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from './core/authentication/authentication.service';
import { LanguageQuery } from './core/localization/language.query';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly translateService: TranslateService,
    private readonly languageQuery: LanguageQuery,
    private readonly notification: NzNotificationService,
    private readonly notificationQuery: NotificationQuery
  ) {
    this.translateService.addLangs(['en', 'vi']);
  }

  ngOnInit(): void {
    this.getUserProfile();
    this.setupTranslateService();
    this.setupReceiveNotification();
  }

  getUserProfile(): void {
    this.authenticationService.getUserProfile().subscribe();
  }

  setupReceiveNotification(): void {
    this.notificationQuery.newNotification$.pipe(filter(x => !!x)).subscribe(message => {
      this.pushMessageNotification(message);
    });
  }

  private pushMessageNotification(message: any): void {
    switch (message.eventName) {
      case NotifyEvent.CreateOrder:
        this.notification.create(
          'info',
          'Đơn hàng mới',
          `Khách hàng ${message.customerName} vừa thực hiện đặt hàng thành công với đơn hàng ${message.orderCode}.`,
          { nzPlacement: 'bottomRight' }
        );
        break;

      default:
        break;
    }
  }

  setupTranslateService(): void {
    this.languageQuery.select(x => x.language).subscribe(
      lang => {
        const currentLanguage = lang ? lang : this.translateService.getDefaultLang();
        this.translateService.use(currentLanguage);
      }
    );
  }
}
