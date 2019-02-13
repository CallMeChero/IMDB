import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  tokenData;
  user;

  quickMenu = [
    {route: '/profile', component: 'View profile'},
    {route: '/#', component: 'Your ratings'},
    {route: '/logout', component: 'Logout'}
  ];

  public loggedIn:boolean;
  constructor(
    private token: TokenService,
    private router: Router
  ) { }

  ngOnInit() {
    this.token.authStatus.subscribe(
      value => this.loggedIn = value
    )
    this.getLoggedUser();
  }

  getLoggedUser() {
    this.tokenData = JSON.parse(this.token.getStorage());
    return this.tokenData.user;
  }

  relocate(event, route: any){
    if(event.source.selected) {
      if(route == '/profile') {
        this.router.navigateByUrl(route + '/' + this.getLoggedUser());
      } else if(route == '/logout') {
        this.logout();
      }
    }
  }

  logout() {
    this.token.changeAuthStatus(false);
    this.token.removeStorage();
    this.router.navigateByUrl('/login');
  }

}
