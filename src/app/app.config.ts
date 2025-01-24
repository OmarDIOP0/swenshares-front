import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { KeycloakService } from './services/auth/keycloak/keycloak.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { securityInterceptor } from './services/auth/interceptors/security-interceptor';
import { routes } from './app.routes';



export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClient,
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([securityInterceptor])
    )
,
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }
  ]
};




