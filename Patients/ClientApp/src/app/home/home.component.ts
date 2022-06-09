import { Component, Directive, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../Models/Patient';
import { PatientService } from '../Services/patientservice.service';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, CellValueChangedEvent, ColDef, GridReadyEvent, RowEditingStoppedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.styles.scss']
})
export class HomeComponent {

  public patients: Patient[];

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'birthday' },
    { field: 'gender' }
  ]; 

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    editable: true
  };

  // Data that gets displayed in the grid
  public rowData$!: Observable<any>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;


  constructor(private http: HttpClient, private service: PatientService) {
  }

  ngOnInit() {
  }

  // Load the patients into the grid
  onGridReady(params: GridReadyEvent) {
    this.rowData$ = this.service.getPatients();
  }

  // Used for editing / updating purposes
  onCellValueChanged(e: CellValueChangedEvent) {
    console.log("event", e);
    this.service.updatePatient(e.data).subscribe(result => {
      console.log(result);
    }, error => console.log(error));
  }

  deleteRows() {
    const selectedRows: IPatient[] = this.agGrid.api.getSelectedRows()

    // remove rows from the grid
    this.agGrid.api.applyTransaction({ remove: selectedRows });

    // delete the data from the db
    selectedRows.forEach(row => {
      this.service.deletePatient(row.id).subscribe(result => {
        console.log("Deletion success!");
      }, error => console.log(error));
    });
  }

  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }


}

interface IPatient {
  id: number,
  firstName: string,
  lastName: string,
  birthday: string,
  gender: string
}


