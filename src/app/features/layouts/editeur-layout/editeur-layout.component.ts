import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/layout/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/layout/sidebar/sidebar.component';

@Component({
  selector: 'app-editeur-layout',
  standalone: true,
  imports: [NavbarComponent,RouterModule,SidebarComponent],
  templateUrl: './editeur-layout.component.html',
  styleUrl: './editeur-layout.component.css'
})
export class EditeurLayoutComponent {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }


}
