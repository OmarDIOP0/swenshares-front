import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface ActionnairePhysique {
  idActPhysique: number;
  prenom: string;
  nom: string;
  nin: string;
  dateExpirationNIN: Date;
  dateDeNaissance: Date;
  adresse: string;
  telephone1: number;
  telephone2: number;
  email: string;
  metier: string;
  pays: string;
  etat: string;
}

export interface ActionnaireMorale {
  idActMorale: number;
  prenomDirigeant: string;
  nomDirigeant: string;
  telDirigeant: string;
  emailDirigeant: string;
  pourcentageCapitalSocial: number;
  appartenanceGroupe: boolean;
  poucentageGroupe: number;
  beneficaireEffecti: string;
  DateVisa: Date;
  DocumentVisa: string;
  metier: string;
  pays: string;
  etat: string;
}

@Component({
  selector: 'app-actionnaire-reviewer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginator,
    MatSort,
    MatTableModule ,
    MatButtonModule
  ],
  templateUrl: './actionnaire-reviewer.component.html',
  styleUrls: ['./actionnaire-reviewer.component.css']
})
export class ActionnaireReviewerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  dataSource = new MatTableDataSource<ActionnairePhysique | ActionnaireMorale>();
  displayedColumns: string[] = [
    'id', 'nom', 'type', 'email', 'telephone', 'metier', 'pays', 
    'etat', 'pourcentageCapitalSocial', 'beneficaireEffecti', 'DateVisa'
  ];
  pageSize: number = 5;
  pageIndex: number = 0;

  actionnairesPhysiques: ActionnairePhysique[] = [
    {
      idActPhysique: 1,
      prenom: 'Issa',
      nom: 'Faye',
      nin: 'SN12345678',
      dateExpirationNIN: new Date(2025, 5, 30),
      dateDeNaissance: new Date(1980, 3, 15),
      adresse: '12 Rue du Commerce, Medina',
      telephone1: 776125678,
      telephone2: 770123456,
      email: 'issa.faye@example.com',
      metier: 'Technologie',
      pays: 'Senegal',
      etat: 'Actif'
    }
    // Ajoutez d'autres actionnaires physiques ici
  ];

  actionnairesMoraux: ActionnaireMorale[] = [
    {
      idActMorale: 1,
      prenomDirigeant: 'Aminata',
      nomDirigeant: 'Sarr',
      telDirigeant: '338761234',
      emailDirigeant: 'contact@societexyz.com',
      pourcentageCapitalSocial: 25,
      appartenanceGroupe: true,
      poucentageGroupe: 50,
      beneficaireEffecti: 'Groupe XYZ',
      DateVisa: new Date(2022, 4, 15),
      DocumentVisa: 'visa_doc_xyz.pdf',
      metier: 'Construction',
      pays: 'Senegal',
      etat: 'Actif'
    }
    // Ajoutez d'autres actionnaires moraux ici
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    // Combine les listes d'actionnaires physiques et moraux
    this.dataSource.data = [...this.actionnairesPhysiques, ...this.actionnairesMoraux];
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 3000 });
  }

  handlePageEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  addActionnaire(actionnaire: ActionnairePhysique | ActionnaireMorale) {
    if ('idActPhysique' in actionnaire) {
      this.actionnairesPhysiques.push(actionnaire);
    } else {
      this.actionnairesMoraux.push(actionnaire);
    }
    this.dataSource.data = [...this.actionnairesPhysiques, ...this.actionnairesMoraux];
    this.openSnackBar('Actionnaire ajouté avec succès!', 'Fermer');
  }

  removeActionnaire(id: number) {
    this.actionnairesPhysiques = this.actionnairesPhysiques.filter(a => a.idActPhysique !== id);
    this.actionnairesMoraux = this.actionnairesMoraux.filter(a => a.idActMorale !== id);
    this.dataSource.data = [...this.actionnairesPhysiques, ...this.actionnairesMoraux];
    this.openSnackBar('Actionnaire supprimé!', 'Fermer');
  }
}
