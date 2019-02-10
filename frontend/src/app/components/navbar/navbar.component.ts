import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

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

  logout(event: MouseEvent) {
  	event.preventDefault();
  	this.token.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
    this.token.removeStorage();
  }

}
