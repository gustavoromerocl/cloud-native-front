import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { sessionReducer } from './store/session/session.reducer';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MsalBroadcastService, MsalGuard, MsalService } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';


const MSALInstanceFactory = () =>
  new PublicClientApplication({
    auth: {
      clientId: '858b4bc0-7115-4192-a217-5de9275c3ab1',
      authority: 'https://login.microsoftonline.com/6594e534-4a19-4085-a8e1-411ef99af367',
      redirectUri: window.location.origin,
    },
  });

const MSALGuardConfigFactory = () => ({
  interactionType: InteractionType.Redirect, // Usa el flujo de redirección
  authRequest: {
    scopes: ['user.read'], // Solicitar permisos necesarios
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideAnimations(), 
    provideAnimationsAsync(),
    provideStore({
      session: sessionReducer,
    }),
    { provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory }, // Proveedor de MSAL Instance
    { provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory }, // Configuración de MSAL Guard
    MsalService, // Servicio de MSAL
    MsalGuard, // Guard de MSAL
    MsalBroadcastService, // Servicio de transmisión de MSAL
  ]
};
