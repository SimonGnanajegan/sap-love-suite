import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { LoveService } from '../../core/services/love.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, BaseChartDirective],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {
  
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['Day 1', 'Day 10', 'Day 50', 'Day 100', 'Today'],
    datasets: [
      { data: [100, 200, 450, 800, 50], label: 'Love Level', backgroundColor: '#e91e63' },
      { data: [5, 2, 1, 0, 50], label: 'Conflict Rate', backgroundColor: '#354a5f' }
    ]
  };

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
    }
  };
  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartData<'pie'> = {
    labels: ['Happiness', 'Cuteness', 'Romance', 'Support'],
    datasets: [ {
      data: [10, 10, 70, 10],
      backgroundColor: ['#FCCDE2', '#e91e63', '#880e4f', '#fce4ec']
    } ]
  };

  constructor(public loveService: LoveService) {}
}
