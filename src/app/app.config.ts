import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { IMAGE_CONFIG } from '@angular/common';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, initializeFirestore, memoryLocalCache, persistentLocalCache, provideFirestore } from '@angular/fire/firestore';
import { getApp } from '@angular/fire/app';
import { firebaseConfig } from './shared/config/firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    {
      provide: IMAGE_CONFIG,
      useValue: {
        disableImageSizeWarning: true,
        disableImageLazyLoadWarning: true,
      },
    },
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => {
      try {
        return initializeFirestore(getApp(), {
          localCache: typeof indexedDB !== 'undefined' ? persistentLocalCache() : memoryLocalCache(),
        });
      } catch {
        return getFirestore(getApp());
      }
    }),
  ],
};
