import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';
import { Router } from '@angular/router';

interface ExtendedKeycloakConfig extends Keycloak.KeycloakConfig {
  sslRequired?: string; // Ajoute sslRequired comme propriété optionnelle
}

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
 
  private _keycloak: Keycloak | undefined;
  private _profile!: UserProfile;
  private _isInitialized = false;

  get keycloak() {
    if (!this._keycloak) {
      const config: ExtendedKeycloakConfig = {
        url: 'https://13.93.236.185:8443',
        realm: 'SwenShares',
        clientId: 'swensharesfront',
        sslRequired: 'none', // Ajoute la configuration SSL
      };
      this._keycloak = new Keycloak(config);
    }
    return this._keycloak;
  }

  get profile(): UserProfile {
    return this._profile;
  }

  constructor(private router: Router) {}

 async init() {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        enableLogging: true,
        pkceMethod: 'S256',
      });

      this._isInitialized = true;

      if (authenticated) {
        this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
        this._profile.token = this.keycloak?.token;
        this._profile.roles = this.keycloak?.tokenParsed?.realm_access?.roles;

        if (
          this._profile.roles?.some((role) => role.toUpperCase() === 'ADMIN')
        ) {
          this.router.navigate(['/admin/dashboard']);
        } else if (
          this._profile.roles?.some((role) => role.toUpperCase() === 'APPROVER')
        ) {
          this.router.navigate(['/approbateur/dashboard']);
        } else if (
          this._profile.roles?.some((role) => role.toUpperCase() === 'EDITOR')
        ) {
          this.router.navigate(['/editeurLayout/editeur']);
        } else if (
          this._profile.roles?.some((role) => role.toUpperCase() === 'EXAMINER')
        ) {
          this.router.navigate(['/reviewerLayout/reviewer']);
        }
        //  else {
        //   this.router.navigate(['/dashboard']);
        // }
      } else {
        // Si non authentifié, forcer la connexion
        await this.keycloak.login();
      }

      return authenticated;
    } catch (error) {
      console.error("Erreur d'initialisation de Keycloak", error);
      this._isInitialized = false;
      this.login();
      return false;
    }
  } 

   
    

  // Nouvelle méthode pour vérifier si un utilisateur a un rôle
  hasRole(expectedRoles: string[]): boolean {
    if (!this._profile || !this._profile.roles) return false;

    return this._profile.roles.some((role) =>
      expectedRoles.map((r) => r.toUpperCase()).includes(role.toUpperCase())
    );
  }

  // Nouvelle méthode pour vérifier l'accès à une route
  canAccessRoute(route: string): boolean {
    const roleAccessMap = {
      '/admin': ['ADMIN'],
      '/editeurLayout': ['EDITOR'],
      '/reviewerLayout': ['EXAMINER'],
      '/approbateur': ['APPROVER'],
    };

    const authorizedRole = Object.entries(roleAccessMap).find(([path]) =>
      route.startsWith(path)
    );

    if (authorizedRole) {
      const [, allowedRoles] = authorizedRole;
      return this.hasRole(allowedRoles);
    }

    return true;
  }


  canAccessGeneralView(): boolean {
    const allowedRoles = ['ADMIN', 'EDITOR', 'EXAMINER', 'APPROVER'];
    return this.hasRole(allowedRoles);
  }
  
   // // Méthode pour obtenir les rôles de l'utilisateur
   async getRoles(): Promise<string[]> {
    return this.keycloak.loadUserProfile().then(profile => {
      return this.keycloak.tokenParsed?.realm_access?.roles || [];
    });
  }

  
  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.keycloak.authenticated ?? false;
  }

  login() {
    return this.keycloak.login();
  }

  logout() {
    // this.keycloak.accountManagement();
    return this.keycloak.logout({ redirectUri: 'http://localhost:4200' });
  }

  // Add a method to check if Keycloak is already initialized
  isInitialized(): boolean {
    return this._isInitialized;
  }

  // Add a method to get the Keycloak token
  getToken() {
    return this.keycloak.token;
  }
}
