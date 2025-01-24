import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material/material.module';

import { ChartOptions, ChartType, ChartDataset } from 'chart.js';

@Component({
  selector: 'app-transaction-reviewer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, MaterialModule, MatFormFieldModule, MatInputModule, MatPaginator, BaseChartDirective, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './transaction-reviewer.component.html',
  styleUrls: ['./transaction-reviewer.component.css']
})
export class TransactionReviewerComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  transactions: Transaction[] = [
    { id: 1, type: 'Achat', quantite: 10, prix: 15000, actionnaire: 'Omar DIOP', timestamp: new Date(), status: 'Submitted' },
    { id: 2, type: 'Achat', quantite: 10, prix: 15000, actionnaire: 'Assane Sylla', timestamp: new Date(), status: 'Approved' },
    { id: 3, type: 'Vente', quantite: 10, prix: 15000, actionnaire: 'Fatou Ka', timestamp: new Date(), status: 'Rejected' },
    { id: 4, type: 'Achat', quantite: 10, prix: 15000, actionnaire: 'Adama FALL', timestamp: new Date(), status: 'Submitted' },
    { id: 5, type: 'Vente', quantite: 10, prix: 15000, actionnaire: 'Kana BASS', timestamp: new Date(), status: 'Submitted' },
    { id: 6, type: 'Achat', quantite: 10, prix: 15000, actionnaire: 'Arame DIOP', timestamp: new Date(), status: 'Approved' }
  ];
  notifications: string[] = [];
  selectedTransaction: Transaction | null = null;
  filterTransactions: Transaction[] = [];
  p1: number = 1;
  pageSize: number = 5;
  pageEvent?: PageEvent;
  startDate: Date | null = null;
  endDate: Date | null = null;

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

  ngOnInit(): void {
    this.fetchNotifications();
    this.filterTransactions = this.transactions;
  }

  constructor(private snackBar: MatSnackBar) {}

  applyFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const filterValue = inputElement.value.trim().toLowerCase();
      this.filterTransactions = this.transactions.filter(transaction =>
        transaction.type.toLowerCase().includes(filterValue) ||
        transaction.actionnaire.toLowerCase().includes(filterValue) ||
        transaction.status.toLowerCase().includes(filterValue)
      );
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

  fetchNotifications(): void {
    this.notifications.push('Vous avez 2 nouvelles transactions en attente.');
  }

  approveTransaction(transaction: Transaction): void {
    if (transaction) {
      transaction.status = 'Approved';
      this.notifications.push(`Transaction ${transaction.id} approuvée !`);
      this.updateChartData(this.filterTransactions);
      this.openSnackBar(`Transaction approuvée avec succès !`, 'Fermer');
    }
  }

  rejectTransaction(transaction: Transaction): void {
    if (transaction) {
      transaction.status = 'Rejected';
      this.notifications.push(`Transaction ${transaction.id} rejetée avec commentaire : "${transaction.comments || ''}"`);
      this.updateChartData(this.filterTransactions);
      this.openSnackBar(`Transaction rejetée avec succès !`, 'Fermer');
    }
  }

  getApprovedCount(): number {
    return this.transactions.filter(t => t.status === 'Approved').length;
  }

  getPendingCount(): number {
    return this.transactions.filter(t => t.status === 'Submitted').length;
  }

  getRejectedCount(): number {
    return this.transactions.filter(t => t.status === 'Rejected').length;
  }

  openApprovedModal(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    if (this.selectedTransaction) {
      // Logic for opening approved modal
    }
  }

  openRejectModal(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    if (this.selectedTransaction) {
      // Logic for opening reject modal
    }
  }

  private updateChartData(filteredTransactions: Transaction[]): void {
    // Met à jour les données des graphiques en fonction des transactions filtrées
    this.statusChartData[0].data = [
      filteredTransactions.filter(t => t.status === 'Approved').length,
      filteredTransactions.filter(t => t.status === 'Rejected').length,
      filteredTransactions.filter(t => t.status === 'Submitted').length,
    ];
    this.chart?.update();
  }

  onDateChange(): void {
    if (this.startDate != null && this.endDate != null) {
      const filteredTransactions = this.transactions.filter(transaction =>
        transaction.timestamp >= this.startDate! && transaction.timestamp <= this.endDate!
      );
      this.updateChartData(filteredTransactions);
    } else {
      this.updateChartData(this.transactions);
    }
  }
}

export interface Transaction {
  id: number;
  type: string;
  quantite: number;
  prix: number;
  actionnaire: string;
  timestamp: Date;  
  status: string;
  comments?: string; 
}

