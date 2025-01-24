import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/layout/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-reviewer-layout',
  standalone: true,
  imports: [NavbarComponent,RouterModule,SidebarComponent],
  templateUrl: './reviewer-layout.component.html',
  styleUrl: './reviewer-layout.component.css'
})
export class ReviewerLayoutComponent {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
