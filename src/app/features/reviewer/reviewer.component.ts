import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReviewerService } from '../../services/reviewer.service';
import { FooterComponent } from '../../shared/layout/footer/footer.component';
import { MatTableModule } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

// Définition de l'interface pour les lignes de la table
interface TableRow {
  id: string;
  raisonSociale: string;
  formeSociale: string;
  adresse: string;
  ninea: string;
  rccm: string;
  capitalSocial: string;
  partsSociales: string;
  statut: string;
}

@Component({
  selector: 'app-reviewer',
  standalone: true,
  imports: [FooterComponent,
     CommonModule,
     RouterModule, 
     MatTableModule, 
     MatPaginatorModule,
     MatSortModule,],
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent implements OnInit {

  // Propriétés des colonnes et dataSource
  displayedColumns: string[] = ['id', 'raisonSociale', 'formeSociale', 'adresse', 'ninea', 'rccm', 'capitalSocial', 'partsSociales', 'statut', 'actions'];
  dataSource: MatTableDataSource<TableRow>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  profilUtilisateur = 'Valideur'; // Simule le profil de l'utilisateur

  tables = [
    {
      title: 'Société éméttrice',
      headers: ['ID ligne', 'Raison sociale', 'Forme sociale', 'Adresse', 'Ninea', 'RCCM', 'Capital Social', 'Parts sociales', 'Statut'],
      rows: [
        ['1', 'SEDIMA', 'SARL', 'Adresse km 25', '82345615', 'RCCM201504165854', '10 000 000', '50%', 'En attente'],
        ['2', 'GAMA TECH', 'SARL', 'PA U25 ', '81234506', 'RCCM201004165854', '50 000 000', '40%', 'En attente'],
        ['1', 'SEDIMA', 'SARL', 'Adresse km 25', '123456', 'RCCM201704165854', '60 000 000', '65%', 'En attente']
      ]
    },
    {
      title: 'Personnes Physiques',
      headers: ['ID ligne', 'Nom', 'Prénom', 'Adresse', 'CNI', 'Date naissance', 'Activité', 'Parts social', 'Pourcentage détenu', 'Statut'],
      rows: [
        ['1', 'Diop', 'Marieme', 'DAKAR PLATEAU', '2501198002446', '01/01/1980', 'Ingénieur', '10', '20%', 'En attente'],
        ['2', 'Tall', 'Amadou', 'Guédiawaye', '1041197803451', '20/11/1978', 'Entrepreneur', '20', '30%', 'En attente'],
        ['3', 'Camara', 'Daouda', 'Pikine', '1501198102446', '01/01/1981', 'Ingénieur', '30', '50%', 'En attente']
      ]
    },
    {
      title: 'Personnes Morales',
      headers: ['ID ligne', 'Nom', 'Prénom', 'Adresse', 'Ninea', 'RCCM', 'Secteur Activité', 'Parts social', 'Pourcentage détenu', 'Statut'],
      rows: [
        ['1', 'Diop', 'Marieme', 'Adresse 2', '8975464215', '01/01/1980', 'Ingénieur', '10', '20%', 'En attente'],
        ['2', 'Sy', 'Lamine', 'Adresse 2', '9682546880', '01/01/1968', 'Ingénieur', '10', '20%', 'En attente'],
        ['3', 'Diop', 'Salimata', 'Adresse 2', '8783600501', '01/01/1978', 'Ingénieur', '10', '20%', 'En attente']
      ]
    },
    {
      title: 'Transactions',
      headers: ['ID ligne', 'Type transaction', 'Date transaction', 'Actionnaire cédant', 'Actionnaire acquéreur', 'Parts sociales', 'Valeur', 'Monnaie', 'Statut'],
      rows: [
        ['1', 'Vente', '01/01/2024', 'Ndiaye Mamadou', 'Gomis Martin', '100', '5 000 000', 'CFA', 'En attente'],
        ['2', 'Achat', '10/08/2024', 'Marieme Diop', 'Lamine Sy', '120', '8 000 000', 'CFA', 'En attente']
      ]
    }
  ];

  constructor(private reviewerService: ReviewerService, @Inject(Router) private router: Router) { 
    // Initialisation de dataSource avec des données par défaut
    this.dataSource = new MatTableDataSource(this.tables[0].rows.map(row => ({
      id: row[0], raisonSociale: row[1], formeSociale: row[2], adresse: row[3], 
      ninea: row[4], rccm: row[5], capitalSocial: row[6], partsSociales: row[7], statut: row[8]
    })));
    
  }

  ngOnInit() {
    // Mapper les données et les assigner à dataSource
    this.dataSource = new MatTableDataSource(
      this.tables[0].rows.map(row => {
        console.log(row); // Vérifiez que l'ID est bien présent
        return {
          id: row[0],  // Assurez-vous que la première valeur correspond à l'ID
          raisonSociale: row[1],
          formeSociale: row[2],
          adresse: row[3],
          ninea: row[4],
          rccm: row[5],
          capitalSocial: row[6],
          partsSociales: row[7],
          statut: row[8]
        };
      })
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Données');
    XLSX.writeFile(wb, 'export.xlsx');
  }

  exportToPDF() {
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [this.displayedColumns],
      body: this.dataSource.filteredData.map(row => [row.id, row.raisonSociale, row.formeSociale, row.adresse, row.ninea, row.rccm, row.capitalSocial, row.partsSociales, row.statut]),
    });
    doc.save('export.pdf');
  }

  validate(row: any) {
    if (row.statut === 'En attente' && this.profilUtilisateur === 'Valideur') {
      console.log('Validation de la ligne:', row);
      // Implémentez la logique de validation ici
    }
  }

  isValiderDisabled(row: any): boolean {
    return !(row.statut === 'En attente' && this.profilUtilisateur === 'Valideur');
  }

  goToUserPage(row: any) {
    if (row && row.id) {
      console.log('Naviguer vers la page de l\'actionnaire:', row.id);
      this.router.navigate(['/actionnaire/view-detail', row.id]);
    } else {
      console.error('ID de l\'actionnaire non défini.');
    }
  }
  
  
}
