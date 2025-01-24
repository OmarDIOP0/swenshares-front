import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../../material/material.module';
import { FooterComponent } from '../../../shared/layout/footer/footer.component';

interface Transaction {
  id: number;
  type: string;
  quantite:number;
  prix:number;
  actionnaire: string;
  timestamp: Date;
  status: 'Submitted' | 'Approved' | 'Rejected';
  comments?: string;
}

@Component({
  selector: 'app-dashboard-approbateur',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, BaseChartDirective,MaterialModule,FooterComponent],
  templateUrl: './dashboard-approbateur.component.html',
  styleUrls: ['./dashboard-approbateur.component.css']
})
export class DashboardApprobateurComponent implements OnInit {
  transactions: Transaction[] = [
    { id: 1, type: 'Achat',quantite:10,prix:15000, actionnaire: 'Omar DIOP', timestamp: new Date(), status: 'Submitted' },
    { id: 2, type: 'Achat',quantite:10,prix:15000 ,actionnaire: 'Assane Sylla', timestamp: new Date(), status: 'Approved' },
    { id: 3, type: 'Vente',quantite:10,prix:15000 ,actionnaire: 'Fatou Ka', timestamp: new Date(), status: 'Rejected' },
    { id: 4, type: 'Achat',quantite:10,prix:15000, actionnaire: 'Adama FALL', timestamp: new Date(), status: 'Submitted' },
    { id: 5, type: 'Vente',quantite:10,prix:15000, actionnaire: 'Kana BASS', timestamp: new Date(), status: 'Submitted' },
    { id: 6, type: 'Achat',quantite:10,prix:15000, actionnaire: 'Arame DIOP', timestamp: new Date(), status: 'Approved' }
  ];

  selectedTransaction: Transaction | null = null;
  notifications: string[] = [];

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  // Données pour le graphique de statut des transactions
  public statusChartLabels: string[] = ['Approuvées', 'Rejetées', 'En Attente'];
  public statusChartType: ChartType = 'pie';
  public statusChartData: ChartDataset[] = [
    { data: [this.getApprovedCount(), this.getRejectedCount(), this.getPendingCount()], label: 'Statut des Transactions' }
  ];

  // Données pour le graphique des types de transactions
  public typeChartLabels: string[] = ['Création', 'Modification', 'Suppression', 'Augmentation', 'Réduction'];
  public typeChartType: ChartType = 'bar';
  public typeChartData: ChartDataset[] = [
    { data: [2, 1, 1, 1, 1], label: 'Transactions par Type' }
  ];

  ngOnInit(): void {
    this.openSnackBar('Bienvenue sur le tableau de bord !', 'Fermer');
  }
  constructor(private snackBar:MatSnackBar){}

  getApprovedCount(): number {
    return this.transactions.filter(t => t.status === 'Approved').length;
  }

  getPendingCount(): number {
    return this.transactions.filter(t => t.status === 'Submitted').length;
  }

  getRejectedCount(): number {
    return this.transactions.filter(t => t.status === 'Rejected').length;
  }


  private updateChartData() {
    this.statusChartData[0].data = [this.getApprovedCount(), this.getRejectedCount(), this.getPendingCount()];
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
