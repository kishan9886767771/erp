import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
var settings = require('../../../../../../config/settings');

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddcompanyComponent implements OnInit {

  addCompanyForm: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<AddcompanyComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.addCompanyForm = this.formBuilder.group({
      // Init Entries here
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNo: this.formBuilder.array([
        this.initphone()
      ]),
      mobileNo: this.formBuilder.array([
        this.initMobile()
      ]),
      email: ['', Validators.email],
      panNumber:['', Validators.required],
      accountNumber:['', Validators.required],
      IFSC:['', Validators.required],
      GSTIN:['', Validators.required],
      bankName:['', Validators.required],
      bankBranch:['', Validators.required],
      notes:['', Validators.required]
    });
  }

  initphone() {
    return this.formBuilder.group({
    phoneNo: ['']
    });
  }

  addPhone() {
    const control = <FormArray>this.addCompanyForm.controls['phoneNo'];
    control.push(this.initphone());
  }

  removePhone(i: number) {
    const control = <FormArray>this.addCompanyForm.controls['phoneNo'];
    control.removeAt(i);
  }

  initMobile() {
    return this.formBuilder.group({
    mobileNo: ['']
    });
  }

  addMobile() {
    const control = <FormArray>this.addCompanyForm.controls['mobileNo'];
    control.push(this.initMobile());
  }

  removeMobile(i: number) {
    const control = <FormArray>this.addCompanyForm.controls['mobileNo'];
    control.removeAt(i);
  }

  get f() { return this.addCompanyForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addCompanyForm.invalid) {
      console.log("Invalid"); return;
    }

    this.dashboardService.addCompany(JSON.stringify(this.addCompanyForm.value))
    .subscribe(
      data=> {
        this.dialogRef.close();
        this._router.navigateByUrl('/companies', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/companies"]));
      },
      error=> console.error(error)
    )

  }

}