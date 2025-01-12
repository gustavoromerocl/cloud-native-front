import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { Patient } from '../../store/patient/patient.model';
import { PatientService } from '../../services/patient-api.service';
import { CommonModule } from '@angular/common';
import { VitalSignsDialogComponent } from '../../components/vital-signs-dialog/vital-signs-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatSidenavModule, 
    MatDialogModule,
    MatButtonModule,
  ],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  dataSource = new MatTableDataSource<Patient>();
  displayedColumns = [
    'id',
    'firstName',
    'lastName',
    'age',
    'admissionDate',
    'bedNumber',
    'diagnosis',
    'status',
    'actions',
  ];
  vitalSigns: any = null;
  isDrawerOpen = false;

  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(
    private patientService: PatientService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.dataSource.data = patients || [];
        console.log('Patients loaded:', patients);
      },
      error: (err) => {
        console.error('Error loading patients:', err);
      },
    });
  }

  viewVitalSigns(patientId: number) {
    this.patientService.getVitalSigns(patientId).subscribe({
      next: (vitalSigns) => {
        this.dialog.open(VitalSignsDialogComponent, {
          data: vitalSigns, // Pasa los datos del API
          width: '600px', // Tamaño del diálogo
        });
      },
      error: (err) => {
        console.error('Error loading vital signs:', err);
      },
    });
  }  
}
