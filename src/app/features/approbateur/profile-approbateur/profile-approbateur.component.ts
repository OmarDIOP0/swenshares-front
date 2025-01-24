import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-approbateur',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-approbateur.component.html',
  styleUrl: './profile-approbateur.component.css'
})
export class ProfileApprobateurComponent {

  isDarkMode: boolean = false;
  selectedSection: string = 'personalInfo';
  showSection(section: string): void {
    this.selectedSection = section;
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

}
