import { Component, ViewChild, ViewEncapsulation, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { MatChipInputEvent, MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { _ } from 'underscore';
import {SelectionModel} from '@angular/cdk/collections';
import { RegisterModalComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DashboardService } from '../dashboard.service';
var settings = require('../../../../../config/settings');

// const COMMA = 188;
// const ENTER = 13;

export interface RowData {
  // picture: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  email: string;
  lastLogin: string;
  role: number;
  uid: number;
  roleName: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]
})
export class UserManagementComponent implements OnInit {

  //Model Item
  selectedOption: string;

  // Table 1 - external filters
  displayedColumnsTable1: string[] = ['firstName', 'lastName', 'mobileNumber', 'email', 'lastLogin', 'role', 'uid'];
  dataSourceTable1: MatTableDataSource<RowData>;
  @ViewChild('paginatorTable1') paginatorTable1: MatPaginator;
  @ViewChild('sortTable1') sortTable1: MatSort;

// Table 2 - local filters
  // displayedColumnsTable2: string[] = ['select', 'picture', 'name', 'country', 'interests', 'subscribed', 'age', 'status'];
  // dataSourceTable2: MatTableDataSource<RowData>;
  // @ViewChild('paginatorTable2') paginatorTable2: MatPaginator;
  // @ViewChild('sortTable2') sortTable2: MatSort;
  // selection = new SelectionModel<RowData>(true, []);

  // Filters for the smart table
  filtersForm: FormGroup;
  filtersVisible = true;
  // toggleFiltersLabel = 'Hide filters';

  // Data from the resolver
  originalData = [];

  // Tags interests
  // selectable = true;
  // removable = true;
  // addOnBlur = true;
  // separatorKeysCodes = [COMMA, ENTER];
  // interests = [];

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

    this.originalData.forEach(row => {
      row.roleName = (_.invert(settings.UserRoles))[row.role];
    });

    this.dataSourceTable1 = new MatTableDataSource(this.originalData);
    // this.dataSourceTable2 = new MatTableDataSource(this.originalData);

    // Set up the form
    this.filtersForm = fb.group({
      search : '',
      // ageRange: [[20, 50]],
      // interests: [[]],
      // subscribed: ''
    });
    this.filtersForm.valueChanges.subscribe(form => { this.table1Filter(form); });
  }

  registerModal(): void {
    const dialogRef = this.dialog.open(RegisterModalComponent);
  }

  editModel(id: string): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {
        _id: id
      }
    });
  }

  deleteUser(id: string) {
    this.dashboardService.deleteUser(id)
    .subscribe(
      data => {
        this._router.navigateByUrl('/user-management', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/user-management"]));
      },
      err => console.error(err)
    )
  }

  ngOnInit() {
    // this.dataSourceTable2.paginator = this.paginatorTable2;
    // define a custom sort for the date field
    // this.dataSourceTable2.sortingDataAccessor = (item, property) => {
    //   switch (property) {
    //     case 'subscribed': return new Date(item.subscribed);
    //     default: return item[property];
    //   }
    // };
    // this.dataSourceTable2.sort = this.sortTable2;


    this.dataSourceTable1.paginator = this.paginatorTable1;
    this.dataSourceTable1.sort = this.sortTable1;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSourceTable2.data.length;
  //   return numSelected === numRows;
  // }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSourceTable2.data.forEach(row => this.selection.select(row));
  // }

  applyFilterTable1(filterValue: string) {
    this.dataSourceTable1.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTable1.paginator) {
      this.dataSourceTable1.paginator.firstPage();
    }
  }

  // Show or hide the available filters
  // toggleFilters(): void {
  //   this.filtersVisible = !this.filtersVisible;
  //   this.toggleFiltersLabel = this.filtersVisible ? 'Hide filters' : 'Show filters';
  // }

  // // Reset all the filters values
  // clearFilters(): void {
  //   this.filtersForm.reset({
  //     search: '',
  //     ageRange: [0, 100],
  //     interests: [],
  //     subscribed: ''
  //   });

  //   this.interests = [];

  //   this.applyFilterTable1('');
  //   this.table1Filter(this.filtersForm.value);
  // }

  // resetDatePicker(): void {
  //   this.filtersForm.controls.subscribed.reset('');
  // }

  // Check if a string contains another
  // stringContains(haystack, needle): boolean {
  //   return (haystack.toLowerCase().indexOf(needle.toLowerCase()) > -1);
  // }

  // Run the filters for the smart table
  table1Filter(form): void {
    // const ageRange = form.ageRange;
    // const interests = this.interests;
    // const subscribed = form.subscribed;

    const results = [];
    this.originalData.forEach(row => {
      // this.roleName = (_.invert(settings.UserRoles))[0];
      // const filter_date = this.datePipe.transform(subscribed, 'yyyy-MM-dd');
      if (
        // (ageRange[0] <= row.age) && (ageRange[1] >= row.age) &&
        // ((subscribed === '') || (new Date(filter_date) > new Date(row.subscribed)))
        true
      ) {
        results.push(row);
      }
    });
    this.dataSourceTable1.data = results;
  }

}
