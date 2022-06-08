import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}


