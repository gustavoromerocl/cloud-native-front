import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { PatientService } from '../../services/patient-api.service';
import { CommonModule } from '@angular/common';
import { VitalSignsDialogComponent } from '../../components/vital-signs-dialog/vital-signs-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Patient } from '../../models/patient.model';
import { CreatePatientDialogComponent } from '../../components/create-patient-dialog/create-patient-dialog.component';

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

  openCreatePatientDialog(): void {
    const dialogRef = this.dialog.open(CreatePatientDialogComponent);
  
    dialogRef.afterClosed().subscribe((result: Patient | null) => {
      if (result) {
        // Llamar al servicio para agregar un nuevo paciente
        this.patientService.addPatient(result).subscribe({
          next: (newPatient) => {
            // Actualiza el datasource correctamente
            const patients = this.dataSource.data; // Obtén los datos actuales
            patients.push(newPatient); // Agrega el nuevo paciente
            this.dataSource.data = patients; // Actualiza el dataSource
          },
          error: (err) => {
            console.error('Error adding patient:', err);
          },
        });
      }
    });
  }
  
}
