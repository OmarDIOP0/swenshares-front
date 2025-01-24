import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule, BaseChartDirective, MatPaginatorModule,MatFormFieldModule,MatInputModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

  p1: number = 1;
  pageSize: number = 5;
  pageEvent?: PageEvent;
  filteredTransactions: any[] = [];

  transactions = [
    { id: 1, type: 'Achat', quantite: '10', prix: 15000, actionnaire: "Ousmane Fall", date: "2024-01-13", statut: 'Active' },
    { id: 2, type: 'Vente', quantite: '12', prix: 12000, actionnaire: "Issa Diallo", date: "2024-01-13", statut: 'Inactive' },
    { id: 3, type: 'Achat', quantite: '14', prix: 25000, actionnaire: "Fatou ka", date: "2024-01-13", statut: 'Active' },
    { id: 4, type: 'Achat', quantite: '20', prix: 15000, actionnaire: "Adama Diop", date: "2024-01-13", statut: 'Active' },
    { id: 5, type: 'Vente', quantite: '32', prix: 12000, actionnaire: "Kana Diallo", date: "2024-01-13", statut: 'Inactive' },
    { id: 6, type: 'Achat', quantite: '11', prix: 25000, actionnaire: "Fatou ka", date: "2024-01-13", statut: 'Active' },
  ];

  public chartOptions: ChartOptions = {
    responsive: true,
  };

  public priceChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public priceChartType: ChartType = 'bar';
  public priceChartLegend = true;
  public priceChartData: ChartDataset[] = [
    { data: [180, 200, 220, 250, 270, 260, 290], label: 'Volume des transactions' }
  ];

  ngOnInit(): void {
    this.filteredTransactions = this.transactions;
  }

  applyFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const filterValue = inputElement.value.trim().toLowerCase();
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.type.toLowerCase().includes(filterValue) ||
        transaction.actionnaire.toLowerCase().includes(filterValue) ||
        transaction.statut.toLowerCase().includes(filterValue)
      );
    }
  }
}
