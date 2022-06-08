import { Component, Directive, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Models/Patient';
import { PatientService } from '../Services/patientservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 // styleUrls: ['./home.styles.css']
})
export class HomeComponent {

  public patients: Patient[];


  constructor(private http: HttpClient, private service: PatientService) {
  }

  ngOnInit() {

    // Let's get the patients from the db right away
    this.service.getPatients().subscribe(result => {
      this.patients = result;
    }, error => console.log(error));

  }


}


