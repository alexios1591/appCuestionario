import { Component, inject, ElementRef, Input, ViewChild } from '@angular/core';
import {
  faUsers,
  faUserCheck,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardService } from '../../api/dashboard.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  imports: [FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private dashboardService = inject(DashboardService);
  @ViewChild('chartCanvas', { static: true }) chartCanvas: any;
  @ViewChild('chartCanvasUser', { static: true }) chartCanvasUser: any;

  chartData: any = {};
  chartDataUser: any = {};

  chart: any;
  chartUser: any;

  faUsers = faUsers;
  faUserCheck = faUserCheck;
  faClipboardList = faClipboardList;
  dashboardStats: any = null;
  period = 'today';

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe((data) => {
      this.dashboardStats = data;
    });

    this.getSurveysByPeriod();
    this.getSurveysByUser();
  }

  getSurveysByUser(): void {
    this.dashboardService.getSurveysByUser().subscribe((data) => {
      this.chartDataUser.labels = data.labels;
      this.chartDataUser.datasets = [
        {
          label: 'Usuarios',
          data: data.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ];
      this.createChartUser();
    });
  }

  getSurveysByPeriod(): void {
    this.dashboardService.getSurveysByPeriod(this.period).subscribe((data) => {
      this.chartData.labels = data.labels;
      this.chartData.datasets = [
        {
          label: 'Encuestas',
          data: data.data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          tension: 0.4,
          fill: true,
        },
      ];
      this.createChart();
    });
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartData.labels,
        datasets: this.chartData.datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createChartUser() {
    if (this.chartUser) {
      this.chartUser.destroy();
    }

    this.chartUser = new Chart(this.chartCanvasUser.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.chartDataUser.labels,
        datasets: this.chartDataUser.datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
        },
      },
    });
  }

  changePeriod(period: HTMLSelectElement) {
    this.period = period.value;
    this.getSurveysByPeriod();
  }
}
