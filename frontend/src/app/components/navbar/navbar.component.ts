import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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
  }

  relocate(event, route: any){
    if(event.source.selected) {
      if(route != '/logout') {
        this.router.navigateByUrl(route);
      } else {
        this.logout();
      }
    }
    if (event.source.selected) {
      console.log('You selected:' , route);
    }
  }

  logout() {
  	this.token.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.token.removeStorage();
  }

}
