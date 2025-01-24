import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../shared/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-approbateur-layout',
  standalone: true,
  imports: [NavbarComponent,RouterModule,SidebarComponent],
  templateUrl: './approbateur-layout.component.html',
  styleUrl: './approbateur-layout.component.css'
})
export class ApprobateurLayoutComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


}
