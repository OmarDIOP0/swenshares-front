import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { KeycloakService } from "../auth/keycloak/keycloak.service";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.keycloakService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Vérifie si l'utilisateur peut accéder à cette route
    if (route.routeConfig?.path?.startsWith('view')) {
      return this.keycloakService.canAccessGeneralView();
    }

    // Vérification par défaut basée sur les rôles
    return this.keycloakService.canAccessRoute(state.url);
  }
}
