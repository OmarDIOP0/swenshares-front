import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../services/auth/keycloak/keycloak.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actionnaires',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actionnaires.component.html',
  styleUrl: './actionnaires.component.css'
})
export class ActionnairesComponent  {

  // public username: string | undefined;
  // public roles: string[] = [];
  // // role: string | undefined;

  // constructor(private keycloakService: KeycloakService) {}

  // async ngOnInit(): Promise<void> {
  //   // Vérifier si l'utilisateur est connecté
  //   const isLoggedIn = await this.keycloakService.isLoggedIn;

  //   if (isLoggedIn) {
  //     // Récupérer le profil de l'utilisateur connecté
  //     const userProfile = await this.keycloakService.profile;
      
  //     // Récupérer le username
  //     this.username = userProfile?.username;

  //     // Récupérer les rôles de l'utilisateur
  //     this.roles = userProfile?.roles || []; // Retourne un tableau vide si les rôles sont vides = this.keycloakService.profile?.roles; // Retourne les rôles de l'utilisateur
  //   } else {
  //     console.log('Utilisateur non connecté.');
  //   }
  // }

  // public username: string | undefined;

  // public roles! : string[];
  // constructor(private keycloakService: KeycloakService) {}

  // async ngOnInit(): Promise<void> {
  //   const isLoggedIn = await this.keycloakService.isLoggedIn;

  //   if (isLoggedIn) {
  //     const userProfile = await this.keycloakService.profile;
  //     console.log('Profil de l\'utilisateur connecté : ', userProfile);
  //     this.username = userProfile?.username;

  //     // Récupérer et afficher les rôles
  //     this.roles = this.keycloakService.profile?.roles  || [];

  //     if (this.roles.length === 0) {
  //       console.log('Aucun rôle trouvé.');
  //     } else {
  //       console.log('Rôles de l\'utilisateur : ', this.roles);
  //     }
  //   } else {
  //     console.log('Utilisateur non connecté.');
  //   }
  // }

}
