import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Alert } from '../../models/alert.model';
import { AlertService } from '../../services/alerts-api.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  dataSource = new MatTableDataSource<Alert>();
  displayedColumns = ['id', 'patientName', 'fieldName', 'alertValue', 'unit', 'alertLevel', 'receivedDate'];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.alertService.getAlerts().subscribe({
      next: (alerts) => {
        this.dataSource.data = alerts || [];
        console.log('Alerts loaded:', alerts);
      },
      error: (err) => {
        console.error('Error loading alerts:', err);
      },
    });
  }
}
