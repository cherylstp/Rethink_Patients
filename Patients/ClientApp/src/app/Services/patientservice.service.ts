import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Patient } from '../Models/Patient';


@Injectable({
  providedIn: 'root'
}) 
export class PatientService {

  private headers: any;

  constructor(private http: HttpClient) {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    this.headers = { headers: headers }
  }

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>("api/Patient");
  }

  addPatients(patients: Patient[]): Observable<any> {
    return this.http.post<any>("api/Patient/Create", patients, this.headers);
  }

  updatePatient(patient: Patient): Observable<any> {
    return this.http.put<Patient>("api/Patient/Update", patient, this.headers);
  }

  deletePatient(patientId: number): Observable<any> {
    return this.http.delete<number>("api/Patient/Delete/" + patientId, this.headers);
  } 

}


