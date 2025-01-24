import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { KeycloakService } from '../../../services/auth/keycloak/keycloak.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,MatTooltipModule,RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isSearchVisible: boolean = false;
  constructor(private router: Router, private keycloakService: KeycloakService) { }
  toggleSearch(){
    this.isSearchVisible = !this.isSearchVisible;
  }

  logout(){
    this.keycloakService.logout();
  }
}
