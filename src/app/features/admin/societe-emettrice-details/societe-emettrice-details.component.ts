  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ActivatedRoute, Router, RouterModule } from '@angular/router';
  import { SocieteEmettriceService } from '../../../services/societe-emettrice.service';
  import { SocieteEmettrice } from '../../../models/societeEmettrice';
  import { ActeSocial } from '../../../models/acteSociale';
  import { SocialActService } from '../../../services/actes-sociales.service';
  import { MatSnackBar } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-societe-emettrice-details',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './societe-emettrice-details.component.html',
    styleUrls: ['./societe-emettrice-details.component.css']
  })
  export class SocieteEmettriceDetailsComponent implements OnInit {
    societe?: SocieteEmettrice;
    loading: boolean = true;
    error: string | null = null;
      actesSociaux: ActeSocial[] = [];

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private societeService: SocieteEmettriceService,
      private socialActeService:SocialActService,
      private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (id) {
        this.loadSocieteDetails(+id);
        this.fetchActesSocials(id);
      }
    }

    loadSocieteDetails(id: number): void {
      this.loading = true;
      this.societeService.getSocieteEmettriceById(id).subscribe({
        next: (data) => {
          this.societe = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des détails :', error);
          this.error = 'Impossible de charger les détails de la société';
          this.loading = false;
        }
      });
    }
    fetchActesSocials(societeId: number): void {
      this.socialActeService.getSocialActsByCompany(societeId).subscribe({
        next: (data) => {
          this.actesSociaux = data;
          console.log('Actes sociaux récupérés', data);
        },
        error: (error: any) => {
          console.error('Erreur lors de la récupération des actes sociaux : ', error);
          this.openSnackBar('Erreur lors de la récupération des actes sociaux', 'Fermer');
        },
      });
    }

    // Helper method to format date
    // formatDate(date: Date | string): string {
    //   return new Date(date).toLocaleDateString('fr-FR', {
    //     year: 'numeric',
    //     month: 'long',
    //     day: 'numeric'
    //   });
    // }

    formatDate(date: string | Date): string {
      return new Date(date).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    formatNumber(num?: number): string {
      return num ? num.toLocaleString() : '';
    }
    // Method to open documents
    openDocument(url?: string): void {
      if (url) {
        window.open(url, '_blank');
      }
    }
    goBack(): void {
      this.router.navigate(['/admin/societe-emettrice']);
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 3000,
      });
    }
  }
