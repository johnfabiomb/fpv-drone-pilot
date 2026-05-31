import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InAppBrowserService {

  isInAppBrowser(): boolean {
    const ua = navigator.userAgent;
    return /Instagram|FBAN|FBAV|FB_IAB|FB4A|Line\/|Musical\.ly/i.test(ua);
  }

  isAndroid(): boolean {
    return /android/i.test(navigator.userAgent);
  }

  /** Launches the current URL in Chrome on Android via the intent:// scheme. */
  openInChrome(): void {
    const stripped = window.location.href.replace(/^https?:\/\//, '');
    window.location.href = `intent://${stripped}#Intent;scheme=https;package=com.android.chrome;end`;
  }
}
