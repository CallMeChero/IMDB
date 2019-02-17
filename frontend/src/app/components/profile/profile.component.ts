import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route,ActivatedRoute } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
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
  actionButtonLabel: string = 'Okay';
  action: boolean = true;

  public areMoviesFilled:boolean = false;

  constructor(
    private auth: AuthService,
    private _rout: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
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
       .subscribe( message=> {
         this.openSnackBar(message)
         this.movies = this.movies.filter(m => m !== movie)
        })
  };
  
  handleResponse(data) {
    this.movies = data;
    for (let [key, value] of Object.entries(this.movies)) {
      if(!this.movies[key].image) {
        console.log(this.movies[key]);
        this.movies[key].image = { filename :'movie_default.jpg'}
      }
    }
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
    const dialogRef = this.dialog.open(EditMovieComponent, {
      width: '750px',
      height: '650px',
      data: {movie: movie}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getUserMovies();
    });
  }

  addMovie(): void {
    const dialogRef = this.dialog.open(MoviesComponent, {
      width: '80%',
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserMovies();
    });
  }

  openSnackBar(data) {
    this.snackBar.open(data.data,this.action ? this.actionButtonLabel : undefined);
  }


}
