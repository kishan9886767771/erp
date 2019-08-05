import { Component, ViewChild, ViewEncapsulation, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { MatChipInputEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { _ } from 'underscore';
import {SelectionModel} from '@angular/cdk/collections';
// import { RegisterModalComponent } from './register/register.component';
import { DashboardService } from '../dashboard.service';
import { AutoCompleterService } from '../dashboard.service';
import { AddUnitComponent } from './add-unit/add-unit.component';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
var settings = require('../../../../../config/settings');

export interface RowData {
  unitNo: string
  addressLine1: string
  ParentUnit: any
  CompanyNames: any
  area: number
  _id: number
}

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class UnitsComponent implements OnInit {

  // Table 1 - external filters
  displayedColumnsTable1: string[] = ['unitNo', 'addressLine1', 'ParentUnit', 'CompanyNames', 'area', '_id'];
  dataSourceTable1: MatTableDataSource<RowData>;
  @ViewChild('paginatorTable1') paginatorTable1: MatPaginator;
  @ViewChild('sortTable1') sortTable1: MatSort;

  // Filters for the smart table
  filtersForm: FormGroup;
  filtersVisible = true;

  // Data from the resolver
  originalData = [];

  isBrowser: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private dashboardService: DashboardService,
    private _router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    console.log(this.displayedColumnsTable1);
    this.isBrowser = isPlatformBrowser(platformId);

    this.originalData = route.snapshot.data['tableData'].data;

    this.dataSourceTable1 = new MatTableDataSource(this.originalData);

    // Set up the form
    this.filtersForm = fb.group({
      search : ''
    });
    this.filtersForm.valueChanges.subscribe(form => { this.table1Filter(form); });
  }

  addUnit(): void {
    const dialogRef = this.dialog.open(AddUnitComponent);
  }

  editUnit(id: string): void {
    const dialogRef = this.dialog.open(EditUnitComponent, {
      data: {
        _id: id
      }
    });
  }

  deleteUnit(id: string) {
    this.dashboardService.deleteUnit(id)
    .subscribe(
      data => {
        this._router.navigateByUrl('/units', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/units"]));
      },
      err => console.error(err)
    )
  }

  ngOnInit() {
    this.dataSourceTable1.paginator = this.paginatorTable1;
    this.dataSourceTable1.sort = this.sortTable1;
  }

  applyFilterTable1(filterValue: string) {
    this.dataSourceTable1.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTable1.paginator) {
      this.dataSourceTable1.paginator.firstPage();
    }
  }

  table1Filter(form): void {

    const results = [];
    this.originalData.forEach(row => {
        results.push(row);
    });
    this.dataSourceTable1.data = results;
  }

}
