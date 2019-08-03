import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
var settings = require('../../../../../../config/settings');
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup;
  submitted = false;
  roles = settings.UserRoles;
  value: any;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.editUserForm = this.formBuilder.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      role: ['', Validators.required],
    });

    this.dashboardService.getUser(this.data['_id'])
    .subscribe(
      data => { this.value = data;this.assignValue(); }
    )
  }

  assignValue(){
    this.editUserForm.setValue({
      id: this.value['_id'],
      firstName: this.value['firstName'],
      lastName: this.value['lastName'],
      email: this.value['email'],
      mobileNumber: this.value['mobileNumber'],
      role: this.value['role']
    });
  }

  get f() { return this.editUserForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editUserForm.invalid) {
      console.log("Invalid"); return;
    }

    this.dashboardService.editUser(JSON.stringify(this.editUserForm.value))
    .subscribe(
      data=> {
        console.log(data);
        this.dialogRef.close();
        this._router.navigateByUrl('/user-management', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/user-management"]));
      },
      error=> console.error(error)
    )

  }

}
