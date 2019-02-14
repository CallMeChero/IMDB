import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route,ActivatedRoute } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DeleteMovieComponent } from '../delete-movie/delete-movie.component';
import { EditMovieComponent } from '../edit-movie/edit-movie.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public movies;
  public error;
  public username;

  public areMoviesFilled:boolean = false;

  constructor(
    private auth: AuthService,
    private _rout: ActivatedRoute,
    public dialog: MatDialog,
  ) { 
    this.username = this._rout.snapshot.paramMap.get("username"); }

  ngOnInit() {
    this.getUserMovies();
  }

  getUserMovies() {
    this.auth.getUserMovies(this.username)
      .subscribe(
        data => this.handleResponse(data),
        error => this.error = error
      )
  }

  deleteMovie(movie): void {
     this.auth.deleteMovie(movie)
       .subscribe( data => {
         this.movies = this.movies.filter(m => m !== movie)
        })
  };
  
  handleResponse(data) {
    console.log(data);
    this.movies = data;
    if(data.length > 0) {
      this.areMoviesFilled = true;
    }
  }

  deleteMovieDialog(movie): void {
    const dialogRef = this.dialog.open(DeleteMovieComponent, {
      width: '400',
      data: {movie: movie}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.deleteMovie(movie);
        if(this.movies.length == 0) {
          this.areMoviesFilled = false;
        }
      }
    });
  }

  editMovieDialog(movie): void {
    console.log(movie);
    const dialogRef = this.dialog.open(EditMovieComponent, {
      width: '600',
      data: {movie: movie}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserMovies();
    });
  }

  addMovie(): void {
    const dialogRef = this.dialog.open(MoviesComponent, {
      width: '750px',
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserMovies();
    });
  }

}
