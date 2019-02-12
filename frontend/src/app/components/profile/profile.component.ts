import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public movies;
  public error;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.auth.getMovies()
      .subscribe(
        data => this.movies = data,
        error => this.error = error
      )
  }

}
