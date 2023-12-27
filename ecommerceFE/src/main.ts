import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { persistState } from '@datorama/akita';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

persistState({
  include: ['authentication', 'language', 'cart'], // list store key
  storage: localStorage, // (optional) default localStorage
});

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
