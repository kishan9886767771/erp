import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
var settings = require('../../../../../../config/settings');
import { Inject } from '@angular/core';

@Component({
  selector: 'app-editcompany',
  templateUrl: './editcompany.component.html',
  styleUrls: ['./editcompany.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditcompanyComponent implements OnInit {

  editCompanyForm: FormGroup;
  submitted = false;
  value: any;
  i: any;

  constructor(
    public dialogRef: MatDialogRef<EditcompanyComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.editCompanyForm = this.formBuilder.group({
      // Init Entries here
      _id: [''],
      name: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      phoneNo: this.formBuilder.array([]),
      mobileNo: this.formBuilder.array([
        //this.initMobile()
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

    this.dashboardService.getCompany(this.data['_id'])
    .subscribe(
      data => { console.log(data['phoneNo'].length); this.i = data['phoneNo'].length; this.value = data;this.assignValue(); }
      //data => {this.value['phoneNo'] }
    )
  }

  initphone(value:any) {
    return this.formBuilder.group({
    phoneNo: [value]
    });
  }
  initMobile(value:any) {
    return this.formBuilder.group({
    mobileNo: [value]
    });
  }
  

  

  assignValue(){
    this.value['phoneNo'].forEach(element => {
      this.addPhone(element)
    });
    this.value['mobileNo'].forEach(element => {
      this.addMobile(element)
    });
    this.editCompanyForm.controls['_id'].patchValue(this.value['_id']);
    this.editCompanyForm.controls['name'].patchValue(this.value['name']);
    this.editCompanyForm.controls['addressLine1'].patchValue(this.value['addressLine1']);
    this.editCompanyForm.controls['addressLine2'].patchValue(this.value['addressLine2']);
    this.editCompanyForm.controls['city'].patchValue(this.value['city']);
    this.editCompanyForm.controls['state'].patchValue(this.value['state']);
    this.editCompanyForm.controls['pincode'].patchValue(this.value['pincode']);
    this.editCompanyForm.controls['email'].patchValue(this.value['email']);
    this.editCompanyForm.controls['panNumber'].patchValue(this.value['panNumber']);
    this.editCompanyForm.controls['accountNumber'].patchValue(this.value['accountNumber']);
    this.editCompanyForm.controls['IFSC'].patchValue(this.value['IFSC']);
    this.editCompanyForm.controls['GSTIN'].patchValue(this.value['GSTIN']);
    this.editCompanyForm.controls['bankName'].patchValue(this.value['bankName']);
    this.editCompanyForm.controls['bankBranch'].patchValue(this.value['bankBranch']);
    this.editCompanyForm.controls['notes'].patchValue(this.value['notes']);
  }

  addPhone(value: any) {
    const control = <FormArray>this.editCompanyForm.controls['phoneNo'];
    control.push(this.initphone(value));
  }

  addMobile(value: any) {
    const control = <FormArray>this.editCompanyForm.controls['mobileNo'];
    control.push(this.initMobile(value));
  }

  removePhone(i: number) {
    const control = <FormArray>this.editCompanyForm.controls['phoneNo'];
    control.removeAt(i);
  }

  removeMobile(i: number) {
    const control = <FormArray>this.editCompanyForm.controls['mobileNo'];
    control.removeAt(i);
  }

  get f() { return this.editCompanyForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editCompanyForm.invalid) {
      console.log("Invalid"); return;
    }
    
    this.dashboardService.editCompany(JSON.stringify(this.editCompanyForm.value))
    .subscribe(
      data=> {
        console.log(data);
        this.dialogRef.close();
        this._router.navigateByUrl('/companies', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/companies"]));
      },
      error=> console.error(error)
    )

  }
}
