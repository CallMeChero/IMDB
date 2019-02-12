import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public movies;
  public error;
  public username;

  constructor(
    private auth: AuthService,
    private _rout: ActivatedRoute
  ) { 
    this.username = this._rout.snapshot.paramMap.get("username"); }

  ngOnInit() {
    //this.getMovies();
    this.getUserMovies();
  }

  /*getMovies() {
    this.auth.getUserMovies( {
      data: this.username
    })
      .subscribe(
        data => this.movies = data,
        error => this.error = error
      )
  }*/

  getUserMovies() {
    this.auth.getUserMovies(this.username)
      .subscribe(
        data => this.movies = data,
        error => this.error = error
      )
  }

}
