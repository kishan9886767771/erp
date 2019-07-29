import { Component, Input, ViewEncapsulation, Inject } from '@angular/core';
import { SideMenuService } from '../../side-menu/side-menu.service';
import { ResponsiveBreakpointsService } from '../../responsive-breakpoints/responsive-breakpoints.service';
import { APP_BASE_HREF } from '@angular/common';
import { filter } from 'rxjs/operators';

import { UsersService } from '../../../users/users.service';
import { DashboardService } from '../../../dashboard/dashboard.service';
import { Router } from '@angular/router';

var config = require('../../../../../../config/config');

@Component({
  selector: 'app-top-navbar-content',
  styleUrls: ['./styles/top-navbar-content.scss'],
  templateUrl: './top-navbar-content.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TopNavbarContentComponent {
  @Input() messages = [];
  @Input() notifications = [];

  sideMenuVisible = true;
  baseUrl = '';
  appName = config.appName;
  firstName = '';
  fullName = '';

  constructor(
    private sideMenuService: SideMenuService,
    private responsiveService: ResponsiveBreakpointsService,
    private _userService: UsersService,
    private _dashboardService: DashboardService,
    private _router: Router,
    @Inject(APP_BASE_HREF) private baseHref: string
  ) {
    this.baseUrl = baseHref;

    this._userService.validatelogin()
    .subscribe(
      data=> {
        this.fullName = data['firstName'] + ' ' + data['lastName'];
        this.fullName = this.fullName.toUpperCase();
        this.firstName = data['firstName'] 
      },
      error => this._router.navigate['/users/login']
    )

    responsiveService.responsiveSubject
      .pipe(
        filter(breakpoint => breakpoint.screen === 'xs-or-sm')
      )
      .subscribe(breakpoint => {
        if (breakpoint.active) {
          this.sideMenuService.sidenav.mode = 'push';
          this.sideMenuService.sidenav.close().then(
            val => {
              // console.log('ok closing');
              this.sideMenuVisible = false;
            },
            err => {
              // console.log('error closing');
            },
            () => {
              // console.log('all closing');
            }
          );
        } else {
          this.sideMenuService.sidenav.mode = 'side';
        }
      });
  }

  toggleSideMenu(): void {
    this.sideMenuService.sidenav.toggle().then(
      val => {
        this.sideMenuVisible = !this.sideMenuVisible;
      },
      err => {
        // console.log('error toggle');
      },
      () => {
        // console.log('all toggle');
      }
    );
  }

  logout(){
    this._userService.logout()
    .subscribe(
      data=>{this._router.navigate(['/users/login'])}
    )
  }

}
