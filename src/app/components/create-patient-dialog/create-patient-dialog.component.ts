import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PatientService } from '../../services/patient-api.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-create-patient-dialog',
  templateUrl: './create-patient-dialog.component.html',
  styleUrls: ['./create-patient-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
})
export class CreatePatientDialogComponent implements OnInit {
  createPatientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePatientDialogComponent>,
    private patientService: PatientService, 
  ) {}

  ngOnInit(): void {
    // Configuración del formulario reactivo
    this.createPatientForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      age: [null, [Validators.required, Validators.min(0), Validators.max(120)]],
      admissionDate: [null, Validators.required],
      bedNumber: ['', Validators.required],
      diagnosis: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  createPatient(): void {
    if (this.createPatientForm.valid) {
      const newPatient: Patient = this.createPatientForm.value;
      this.patientService.addPatient(newPatient).subscribe({
        next: (response) => {
          console.log('Paciente creado exitosamente:', response);
          this.dialogRef.close(response); // Cierra el modal y pasa el nuevo paciente creado
        },
        error: (err) => {
          console.error('Error al crear el paciente:', err);
        },
      });
    } else {
      console.error('Formulario inválido');
      this.createPatientForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
