import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/layout/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/layout/sidebar/sidebar.component';
import { FooterComponent } from '../../../shared/layout/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,FooterComponent,RouterModule,CommonModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
