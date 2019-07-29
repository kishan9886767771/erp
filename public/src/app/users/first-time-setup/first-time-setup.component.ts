import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-first-time-setup',
  templateUrl: './first-time-setup.component.html',
  styleUrls: ['./first-time-setup.component.css']
})
export class FirstTimeSetupComponent implements OnInit {
  firsttimesetupForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _userService: UsersService, private _router: Router) {
    this._userService.validatefirsttimesetup()
    .subscribe(
      data=>this._router.navigate(['/users/login'])
    )
  }

  ngOnInit() {
    this.firsttimesetupForm = this.formBuilder.group({
      appName: ['', Validators.required],
      appLogoURL: ['', Validators.required],
      appfavIcon: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.firsttimesetupForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.firsttimesetupForm.invalid) {
      console.log("Invalid");
      return;
    }

    this._userService.firsttimesetup(JSON.stringify(this.firsttimesetupForm.value))
    .subscribe(
      data=> this._router.navigate(['/users/login'])
    )
  }

}