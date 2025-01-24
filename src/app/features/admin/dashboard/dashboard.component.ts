import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../../shared/layout/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,BaseChartDirective,FooterComponent,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Données statiques pour les statistiques globales
  stats = {
    totalActions: 1200,
    totalValue: 450000,
    totalUsers: 300,
    transactions: 15,
    actionnaireMoral:10,
    actionnairePhysique:10,
  };

  // Options communes pour les graphiques
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  // Données pour le graphique de l'évolution du prix des actions
  public priceChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public priceChartType: ChartType = 'line';
  public priceChartLegend = true;
  public priceChartData: ChartDataset[] = [
    { data: [180, 200, 220, 250, 270, 260, 290], label: 'Prix des actions' }
  ];

  // Données pour le graphique du volume des transactions
  public volumeChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public volumeChartType: ChartType = 'bar';
  public volumeChartLegend = true;
  public volumeChartData: ChartDataset[] = [
    { data: [100, 120, 130, 150, 170, 160, 180], label: 'Volume des transactions' }
  ];

  // Liste statique des transactions récentes
  recentTransactions = [
    { id: 1, action: 'Achat', quantity: 50, price: 1000, user: 'Omar DIOP', date: '2024-09-01' },
    { id: 2, action: 'Vente', quantity: 30, price: 600, user: 'Issa Fall', date: '2024-08-25' },
    { id: 3, action: 'Achat', quantity: 70, price: 2000, user: 'Mamaou ka', date: '2024-08-20' },
    { id: 4, action: 'Vente', quantity: 40, price: 800, user: 'Anna Sylla', date: '2024-08-18' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
