import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DashboardService } from '../../dashboard.service';
import { Router } from '@angular/router';
var settings = require('../../../../../../config/settings');

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdditemComponent implements OnInit {

  addItemForm: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<AdditemComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
      type: ['', Validators.required]
    });
  }

  get f() { return this.addItemForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addItemForm.invalid) {
      console.log("Invalid"); return;
    }

    this.dashboardService.addItem(JSON.stringify(this.addItemForm.value))
    .subscribe(
      data=> {
        this.dialogRef.close();
        this._router.navigateByUrl('/manage-items', {skipLocationChange: true}).then(()=>
        this._router.navigate(["/dashboard/manage-items"]));
      },
      error=> console.error(error)
    )

  }

}
