export interface Alert {
  id: number;
  vitalSignId: number;
  patientId: number;
  patientName: string;
  fieldName: string;
  alertValue: number;
  unit: string;
  alertLevel: string;
  receivedDate: string;
}
