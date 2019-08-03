import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
var settings = require('../../../../../../config/settings');
import { Inject } from '@angular/core';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EdititemComponent implements OnInit {

  editItemForm: FormGroup;
  submitted = false;
  value: any;

  constructor(
    public dialogRef: MatDialogRef<EdititemComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.editItemForm = this.formBuilder.group({
      id: [''],
      type: ['', Validators.required]
    });

    this.dashboardService.getItem(this.data['_id'])
    .subscribe(
      data => { this.value = data;this.assignValue(); }
    )

  }

  assignValue(){
    this.editItemForm.setValue({
      id: this.value['_id'],
      type: this.value['type']
    });
  }

  get f() { return this.editItemForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editItemForm.invalid) {
      console.log("Invalid"); return;
    }

    this.dashboardService.editItem(JSON.stringify(this.editItemForm.value))
    .subscribe(
      data=> {
        console.log(data);
        this.dialogRef.close();
        this._router.navigateByUrl('/manage-items', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/manage-items"]));
      },
      error=> console.error(error)
    )

  }

}
