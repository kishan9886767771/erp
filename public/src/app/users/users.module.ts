import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersService } from './users.service'
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { LoginComponent } from './login/login.component';
import { FirstTimeSetupComponent } from './first-time-setup/first-time-setup.component';

@NgModule({
  declarations: [UsersComponent, LoginComponent, FirstTimeSetupComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService
  ]
})
export class UsersModule { }
