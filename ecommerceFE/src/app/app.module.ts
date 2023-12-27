import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import vi from '@angular/common/locales/vi';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { en_US, NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

const nzModules = [
  NzNotificationModule
];

registerLocaleData(vi);

export const createTranslateLoader = (http: HttpClient) => new TranslateHttpLoader(http,`${window.location.origin}/assets/i18n/`, '.json');
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    nzModules,
    environment.production ? [] : AkitaNgDevtools.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      },
      defaultLanguage: 'vi'
    })
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    { provide: LOCALE_ID, useValue: 'vi-VN'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
