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

  /** Returns the name of the detected in-app browser for labelling the back button. */
  getAppLabel(): string {
    const ua = navigator.userAgent;
    if (/Instagram/i.test(ua))          return 'Instagram';
    if (/FBAN|FBAV|FB_IAB|FB4A/i.test(ua)) return 'Facebook';
    if (/Line\//i.test(ua))             return 'Line';
    if (/Musical\.ly/i.test(ua))        return 'TikTok';
    return 'App';
  }

  /** Closes the webview and returns the user to the host app. */
  closeWebview(): void {
    window.close();
    // Fallback: if window.close() is blocked, go back in history
    setTimeout(() => history.back(), 300);
  }

  /** Launches the current URL in Chrome on Android via the intent:// scheme. */
  openInChrome(): void {
    const stripped = window.location.href.replace(/^https?:\/\//, '');
    window.location.href = `intent://${stripped}#Intent;scheme=https;package=com.android.chrome;end`;
  }
}
