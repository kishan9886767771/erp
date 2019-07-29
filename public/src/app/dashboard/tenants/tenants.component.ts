import { Component, ViewChild, ViewEncapsulation, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { MatChipInputEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { _ } from 'underscore';
import {SelectionModel} from '@angular/cdk/collections';
// import { RegisterModalComponent } from './register/register.component';
import { DashboardService } from '../dashboard.service';
var settings = require('../../../../../config/settings');

export interface RowData {
  name: string
  GSTIN: string
  email: string
  phoneNo: number
  _id: number
}

@Component({
  selector: 'app-tenants',
  templateUrl: './tenants.component.html',
  styleUrls: ['./tenants.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class TenantsComponent implements OnInit {

  // Table 1 - external filters
  displayedColumnsTable1: string[] = ['name', 'GSTIN', 'email', 'phoneNo', '_id'];
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
    this.isBrowser = isPlatformBrowser(platformId);

    this.originalData = route.snapshot.data['tableData'].data;

    this.dataSourceTable1 = new MatTableDataSource(this.originalData);

    // Set up the form
    this.filtersForm = fb.group({
      search : ''
    });
    this.filtersForm.valueChanges.subscribe(form => { this.table1Filter(form); });
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
