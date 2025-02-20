import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment';
import { Alert } from '../models/alert.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = `${environment.patientApiUrl}/alerts`;

  constructor(private http: HttpClient) {}

  getPatients(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.apiUrl);
  }
}
