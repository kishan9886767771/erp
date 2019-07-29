import { OnInit, AfterContentInit, Component, ViewChild, ViewEncapsulation, PLATFORM_ID, Inject } from '@angular/core';
import { MessagesMenuService, NotificationsMenuService, SideMenuService } from '../core';
import { isPlatformBrowser } from '@angular/common';
import { DashboardService } from './dashboard.service';
import { UsersService } from '../users/users.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../styles/app.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements AfterContentInit {

  @ViewChild('drawerContainer') drawerContainer;
  @ViewChild('sideMenu') sideMenu;
  @ViewChild('sideNotifications') sideNotifications;

  notifications = [];
  messages = [];
  open_menu = false;

  constructor(
    private sideMenuService: SideMenuService,
    private notificationsMenuService: NotificationsMenuService,
    private _userService: UsersService,
    private _dashboardService: DashboardService,
    private _router: Router,
    private messagesMenuService: MessagesMenuService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this._userService.validatelogin()
    .subscribe(
      data=> console.log(data),
      error => this._router.navigate(['/users/login'])
    )

    notificationsMenuService.getNotifications().then((notifications: any) => {
      this.notifications = notifications;
    });
    messagesMenuService.getMessages().then((messages: any) => {
      this.messages = messages;
    });
  }

  ngAfterContentInit(): void {
    this.sideMenuService.sidenav = this.sideMenu;
    this.sideMenuService.drawerContainer = this.drawerContainer;
    this.notificationsMenuService.sidenav = this.sideNotifications;
    if (isPlatformBrowser(this.platformId)) {
      this.open_menu = true;
    }
  }

}
