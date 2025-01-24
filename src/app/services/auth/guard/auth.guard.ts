import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { KeycloakService } from "../keycloak/keycloak.service";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérification de l'authentification
    if (!this.keycloakService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Vérification du rôle pour la route spécifique
    if (!this.keycloakService.canAccessRoute(state.url)) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}