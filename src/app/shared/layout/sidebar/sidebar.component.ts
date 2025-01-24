import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KeycloakService } from '../../../services/auth/keycloak/keycloak.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  ngOnInit(): void {
  }

  isSidebarOpen: boolean = true;
  isLargeScreen: boolean = false;
  isSearchVisible: boolean = false;
  isActionnaireDropdownOpen: boolean = false; // État du dropdown des actionnaires
  isSocieteDropdownOpen: boolean = false; // État du dropdown des sociétés
  isTransactionDropdownOpen: boolean = false; // État du dropdown des transactions
  userRoles: string[] | undefined;

  constructor(private keycloakService: KeycloakService,) {
    this.checkScreenSize();
    this.keycloakService.getRoles().then(roles => {
      this.userRoles = roles;
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Méthode pour vérifier si l'utilisateur peut voir un menu
  canShowMenu(requiredRoles: string[]): boolean {
    return requiredRoles.some(role => this.userRoles?.includes(role));
  }

  isRouteVisible(route: string): boolean {
    return this.keycloakService.canAccessRoute(route);
  }


  toggleSearch() {
    this.isSearchVisible = !this.isSearchVisible;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isLargeScreen = window.innerWidth >= 768;
    if (this.isLargeScreen) {
      this.isSidebarOpen = true;
    }
  }

  // Méthode pour basculer l'état du dropdown des actionnaires
  toggleActionnaireDropdown(): void {
    this.isActionnaireDropdownOpen = !this.isActionnaireDropdownOpen;
  }

  // Méthode pour basculer l'état du dropdown des sociétés
  toggleSocieteDropdown(): void {
    this.isSocieteDropdownOpen = !this.isSocieteDropdownOpen;
  }

  // Méthode pour basculer l'état du dropdown des transactions
  toggleTransactionDropdown(): void {
    this.isTransactionDropdownOpen = !this.isTransactionDropdownOpen;
  }
}
