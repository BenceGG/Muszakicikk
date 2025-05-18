import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "muszakicikk-e3ab5", appId: "1:822865661691:web:0f7c235b5761298e3b2a5e", storageBucket: "muszakicikk-e3ab5.firebasestorage.app", apiKey: "AIzaSyBs824QP4iF_Yh5NY7HixE7iTMUAGpCvAw", authDomain: "muszakicikk-e3ab5.firebaseapp.com", messagingSenderId: "822865661691" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
