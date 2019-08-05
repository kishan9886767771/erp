import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
import { AutoCompleterService } from '../../dashboard.service'
var settings = require('../../../../../../config/settings');

@Component({
  selector: 'app-add-unit',
  templateUrl: './add-unit.component.html',
  styleUrls: ['./add-unit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddUnitComponent implements OnInit {

  addUnitForm: FormGroup;
  submitted = false;
  options = {
    simple: []
  };

  options2 = {
    simple: []
  };

  companyName: any;

  constructor(
    public dialogRef: MatDialogRef<AddUnitComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private _router: Router,
    private autoCompleterService: AutoCompleterService
  ) { }

  ngOnInit() {

    this.addUnitForm = this.formBuilder.group({
      unitNo: ['', Validators.required],
      hasParent: [false],
      parent: [''],
      addressLine1: [''],
      addressLine2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      pincode: ['', Validators.required],
      area: ['', Validators.required],
      companies: this.formBuilder.array([
        this.initUnit()
      ]),
      // percentageOwnership: this.formBuilder.array([])
    });
  }

  filter(event, type): void {
    const input = event.target.value;
    if (input === '') {
      this.options[type] = [];
    } else {
      this.autoCompleterService.getData(input).then((res: any) => {
        this.options[type] = res;
      });
    }
  }

  filterCompany(event, type): void {
    const input = event.target.value;
    if (input === '') {
      this.options2[type] = [];
    } else {
      this.autoCompleterService.getCompanyData(input).then((res: any) => {
        this.options2[type] = res;
      });
    }
  }

  initUnit() {
    return this.formBuilder.group({
      company: [''],
      percentageOwnership: ['']
    });
  }

  addUnit() {
    const control = <FormArray>this.addUnitForm.controls['companies'];
    control.push(this.initUnit());
  }

  removeUnit(i: number) {
    const control = <FormArray>this.addUnitForm.controls['companies'];
    control.removeAt(i);
  }

  get f() { return this.addUnitForm.controls; }

  onSubmit() {
    this.submitted = true;
    if(this.addUnitForm.value['hasParent'])
      this.addUnitForm.value['parent'] = this.options.simple[0]._id;
    
    console.log(this.options2.simple);
    return

    if (this.addUnitForm.invalid) {
      console.log("Invalid"); return;
    }

    // console.log(JSON.stringify(this.addUnitForm.value));

    this.dashboardService.addUnit(JSON.stringify(this.addUnitForm.value))
    .subscribe(
      data=> {
        this.dialogRef.close();
        this._router.navigateByUrl('/units', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/units"]));
      },
      error=> console.error(error)
    )

  }

}
