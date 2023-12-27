import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { authenticationProviders } from './authentication/authentication-providers';
import { guardProviders } from './guards/guard-providers';
import { interceptorProviders } from './interceptors/index';
import { localizationProviders } from './localization/localization-providers';
import { notificationProviders } from './notification/notification-providers';
import { SignalRService } from './signalR/signal-r.service';
@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    interceptorProviders,
    SignalRService,
    authenticationProviders,
    guardProviders,
    localizationProviders,
    notificationProviders
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error('CoreModule has already been loaded. Import the core modules in AppModule only.');
    }
  }
}
