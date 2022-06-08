import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Models/Patient';
import { PatientService } from '../Services/patientservice.service';


@Component({
  selector: 'app-patient-upload',
  templateUrl: './patient-upload.component.html',
  styleUrls: ['./patient-upload.component.css']
})
export class PatientUploadComponent implements OnInit {

  fileName: string = '';

  constructor(private http: HttpClient, private service: PatientService) {

  }


  ngOnInit() {
  }

  public onFileSelected(event) {

    // only one file (for now), so grab the first one in the array
    const file: File = event.target.files[0];
    if (file) {

      // set name so we can display in the UI
      this.fileName = file.name;

      // now let's read the file to an array
      let reader: FileReader = new FileReader()
      reader.readAsText(file);

      reader.onload = () => {
        let csvData: string = reader.result.toString();
        let rows: string[] = csvData.split(/\r\n|\n/);

        // remove the first row in the array, since it's just headers
        // remove the last row in the array, since it's empty
        rows = rows.slice(1, rows.length - 1);

        let patientsToAdd: Patient[] = this.createPatientObjects(rows);
        this.service.addPatients(patientsToAdd).subscribe(result => {
          console.log(result);
        }, error => console.log(error));

      }

      reader.onerror = function () {
        console.log('Error in reading file');
      };
    }
  }

  createPatientObjects(rows: string[]): Patient[] {
    let patients: Patient[] = [];

    rows.forEach(row => {
      let currentRow: string[] = row.split(',');
      let patient: Patient = new Patient(
        currentRow[0].trim(),
        currentRow[1].trim(),
        currentRow[2].trim(),
        currentRow[3].trim()
      );

      patients.push(patient);
    });

    return patients;
  }


}
