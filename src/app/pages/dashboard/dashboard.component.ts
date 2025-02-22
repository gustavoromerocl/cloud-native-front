import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { Chart, registerables } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { PatientService } from '../../services/patient-api.service';
import { AlertService } from '../../services/alerts-api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalPatients: number = 0;
  totalAlerts: number = 0;
  alertLevels: { low: number; medium: number; high: number } = { low: 0, medium: 0, high: 0 };

  public alertChartData: any;
  public alertChartOptions: any;

  constructor(private alertService: AlertService, private patientService: PatientService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadPatientsData();
    this.loadAlertsData();
  }

  private loadPatientsData() {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.totalPatients = patients.length;
      },
      error: (err) => console.error('Error loading patients:', err),
    });
  }

  private loadAlertsData() {
    this.alertService.getAlerts().subscribe({
      next: (alerts) => {
        this.totalAlerts = alerts.length;
        this.alertLevels.low = alerts.filter(a => a.alertLevel === 'LOW').length;
        this.alertLevels.medium = alerts.filter(a => a.alertLevel === 'MEDIUM').length;
        this.alertLevels.high = alerts.filter(a => a.alertLevel === 'HIGH').length;
        this.prepareChart();
      },
      error: (err) => console.error('Error loading alerts:', err),
    });
  }

  private prepareChart() {
    this.alertChartData = {
      labels: ['LOW', 'MEDIUM', 'HIGH'],
      datasets: [
        {
          data: [this.alertLevels.low, this.alertLevels.medium, this.alertLevels.high],
          backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
        },
      ],
    };

    this.alertChartOptions = {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' },
      },
    };
  }
}
