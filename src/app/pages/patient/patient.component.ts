import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Patient } from '../../store/patient/patient.model'; // Reutiliza el modelo existente
import { PatientService } from '../../services/patient-api.service'; // Importa el servicio

@Component({
  selector: 'app-patient',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule],
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  dataSource = new MatTableDataSource<Patient>();
  displayedColumns = ['id', 'firstName', 'lastName', 'age', 'admissionDate', 'bedNumber', 'diagnosis', 'status'];

  constructor(private patientService: PatientService) {} // Inyecta el servicio

  ngOnInit() {
    // Llama directamente al servicio para obtener los datos
    this.patientService.getPatients().subscribe({
      next: (patients) => {
        this.dataSource.data = patients || [];
        console.log('Patients loaded:', patients); // Verifica la carga de datos
      },
      error: (err) => {
        console.error('Error loading patients:', err); // Maneja errores
      },
    });
  }
}
