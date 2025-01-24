import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ActionnaireService } from '../../../services/actionnaire.service';


import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-actionnaire',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './actionnaire.component.html',
  styleUrls: ['./actionnaire.component.css'],
})
export class ActionnaireComponent implements OnInit {
  physicalShareholders: any[] = [];
  moralShareholders: any[] = [];
  filteredPhysicalShareholders: any[] = [];
  filteredMoralShareholders: any[] = [];
  pageSize: number = 5;
  pageEvent?: PageEvent;
  p1: number = 1;
  p2: number = 1;

  constructor(private actionnaireService: ActionnaireService) {}

  async ngOnInit(): Promise<void> {
    await this.fetchAllShareholders();
  }

  // Fetch all shareholders (physical and moral) from the backend
  async fetchAllShareholders(): Promise<void> {
    try {
      const physicalResponse = await firstValueFrom(
        this.actionnaireService.getAllActionnairesPhysiques()
      );
      const moralResponse = await firstValueFrom(
        this.actionnaireService.getAllActionnairesMorales()
      );

      // Format data for physical shareholders
      this.physicalShareholders = physicalResponse.map((shareholder: any) => ({
        id: shareholder.id,
        nom: `${shareholder.contact_person?.first_name || ''} ${shareholder.contact_person?.last_name || ''}`,
        email: shareholder.contact_person?.email || 'Non spécifié',
        telephone: shareholder.contact_person?.phone || 'Non spécifié',
        pays: shareholder.addresses?.[0]?.country || 'Non spécifié',
        dateOfBirth: shareholder.date_of_birth || 'Non spécifié',
        nationalId: shareholder.national_id || 'Non spécifié',
        totalShares: shareholder.total_shares || 0,
      }));

      // Format data for moral shareholders
      this.moralShareholders = moralResponse.map((shareholder: any) => ({
        id: shareholder.id,
        nomEntreprise: shareholder.activity_sector || 'Non spécifié',
        email: shareholder.contact_person?.email || 'Non spécifié',
        telephone: shareholder.contact_person?.phone || 'Non spécifié',
        pays: shareholder.addresses?.[0]?.country || 'Non spécifié',
        totalShares: shareholder.total_shares || 0,
      }));

      console.log('Physical shareholders:', this.physicalShareholders);
      console.log('Moral shareholders:', this.moralShareholders);

      // Initialize filtered arrays
      this.filteredPhysicalShareholders = [...this.physicalShareholders];
      this.filteredMoralShareholders = [...this.moralShareholders];
    } catch (error) {
      console.error('Error fetching shareholders:', error);
    }
  }

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const filterValue = inputElement.value.trim().toLowerCase();

      this.filteredPhysicalShareholders = this.physicalShareholders.filter(
        (shareholder) =>
          shareholder.nom.toLowerCase().includes(filterValue) ||
          shareholder.email.toLowerCase().includes(filterValue) ||
          shareholder.telephone.toLowerCase().includes(filterValue) ||
          shareholder.pays.toLowerCase().includes(filterValue)
      );

      this.filteredMoralShareholders = this.moralShareholders.filter(
        (shareholder) =>
          shareholder.nomEntreprise.toLowerCase().includes(filterValue) ||
          shareholder.email.toLowerCase().includes(filterValue)
      );
    }
  }
}
