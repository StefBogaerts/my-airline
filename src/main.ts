import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

export const IS_MOBILE = detectMobile();

/**
 * This function checks whether we're currently on a mobile device.
 */
export function detectMobile() {
  const regExp = new RegExp('Android|webOS|iPhone|iPad|' +
    'BlackBerry|Windows Phone|' +
    'Opera Mini|IEMobile|Mobile',
    'i');
  return regExp.test(navigator.userAgent);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
