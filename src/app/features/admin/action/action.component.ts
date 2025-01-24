import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset,ChartOptions,ChartType } from 'chart.js';

@Component({
  selector: 'app-action',
  standalone: true,
  imports: [CommonModule,RouterModule,BaseChartDirective],
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent implements OnInit{

  actions = [
    { id: 1 , nom: 'Action A', code: 'A1', valeur: 15000, nombreTotal: 500, pourcentageCapital: 10, statut: 'Active' },
    { id: 2 , nom: 'Action B', code: 'B1', valeur: 12000, nombreTotal: 300, pourcentageCapital: 5, statut: 'Inactive' },
    { id: 3 , nom: 'Action C', code: 'C1', valeur: 25000, nombreTotal: 700, pourcentageCapital: 20, statut: 'Active' }
  ];
  public chartOptions:ChartOptions = {
    responsive:true,
  };

  public priceChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  public priceChartType: ChartType = 'line';
  public priceChartLegend = true;
  public priceChartData: ChartDataset[] = [
    { data: [180, 200, 220, 250, 270, 260, 290], label: 'Evolution du prix des actions' }
  ];
 ngOnInit(): void {
 }
}
