import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  serverErrorMessages: String = '';

  constructor(private formBuilder: FormBuilder, private _userService: UsersService, private _router: Router) { 
    this._userService.validatefirsttimesetup()
    .subscribe(
      data=>console.log(data),
      error=>this._router.navigate(['/users/first-time-setup'])
    )
    this._userService.validatelogin()
    .subscribe(
      data => this._router.navigate(['/dashboard'])
    )
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log("Invalid");
      return;
    }

    this._userService.login(JSON.stringify(this.loginForm.value))
    .subscribe(
      data=>{this._router.navigate(['/dashboard']);},
      error=>{this.serverErrorMessages = error.error['message']}
    )
  }

}
