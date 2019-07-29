import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
var settings = require('../../../../../../config/settings');

@Component({
  selector: 'app-modal-register',
  templateUrl: 'register.component.html',
  styleUrls: ['./styles/register.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterModalComponent implements OnInit {
  addNewUserForm: FormGroup;
  submitted = false;
  roles = settings.UserRoles;

  constructor(
    public dialogRef: MatDialogRef<RegisterModalComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.addNewUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
    });

  }

  get f() { return this.addNewUserForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addNewUserForm.invalid) {
      console.log("Invalid"); return;
    }

    this.dashboardService.addUserToDB(JSON.stringify(this.addNewUserForm.value))
    .subscribe(
      data=> {this.dialogRef.close(); console.log(data)},
      error=> console.error(error)
    )

  }

}
