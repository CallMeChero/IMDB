import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Route,ActivatedRoute } from '@angular/router';
import { MoviesComponent } from '../movies/movies.component';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DeleteMovieComponent } from '../delete-movie/delete-movie.component';
import { EditMovieComponent } from '../edit-movie/edit-movie.component';
import { SeriesComponent } from '../series/series.component';
import { EditSerieComponent } from '../edit-serie/edit-serie.component';
import { DeleteSerieComponent } from '../delete-serie/delete-serie.component';
import {HttpParams} from  "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  public movies;
  public error;
  public username;
  actionButtonLabel: string = 'Okay';
  action: boolean = true;

  public areMoviesFilled:boolean = false;
  public areSeriesFilled:boolean = false;

  public series;

  constructor(
    private auth: AuthService,
    private _rout: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { 
    this.username = this._rout.snapshot.paramMap.get("username"); }

  ngOnInit() {
    this.getUserMovies();
    this.getUserSeries();
  }

  getUserMovies() {
    this.auth.getUserMovies(this.username)
      .subscribe(
        data => this.handleResponse(data),
        error => this.error = error
      )
  }
  
  handleResponse(data) {
    this.movies = data;
    console.log(this.movies);
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

  /*  search */

  movieFilter (value: string):void{
    if(value) {
      this.auth.searchUserMovies(value,this.username)
        .subscribe(
        data => this.handleMovieFilter(data),
        error => console.log(error)
      )
    } else {
      this.getUserMovies()
    }
  }

  handleMovieFilter(data){
    this.movies = data;
  }

  serieFilter (value: string):void{
    if(value !== '') {
      this.auth.searchSerieFilter(value,this.username)
        .subscribe(
        data => this.handleSeriesFilter(data),
        error => console.log(error)
      )
    } else {
      this.getUserMovies()
    }
  }

  handleSeriesFilter(data){
    this.series = data;
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

  deleteMovie(movie): void {
    this.auth.deleteMovie(movie)
      .subscribe( message=> {
        this.openSnackBar(message)
        this.movies = this.movies.filter(m => m !== movie)
       })
  };

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

  /* SERIES */

  getUserSeries() {
    this.auth.getUserSeries(this.username)
      .subscribe(
        data => this.handleSeriesResponse(data),
        error => console.log(error)
      )
  }

  handleSeriesResponse(data) {
    this.series = data;
    for (let [key, value] of Object.entries(this.series)) {
      if(!this.series[key].image) {
        this.series[key].image = { filename :'movie_default.jpg'}
      }
    }
    if(data.length > 0) {
      this.areSeriesFilled = true;
    }
  }

  addSerie(): void {
    const dialogRef = this.dialog.open(SeriesComponent, {
      width: '80%',
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserSeries();
    });
  }

  editSerieDialog(serie): void {
    const dialogRef = this.dialog.open(EditSerieComponent, {
      width: '750px',
      height: '650px',
      data: {serie: serie}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUserSeries();
    });
  }

  deleteSerieDialog(serie): void {
    const dialogRef = this.dialog.open(DeleteSerieComponent, {
      width: '400',
      data: {serie: serie}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.deleteSerie(serie);
      }
    });
  }

  deleteSerie(serie): void {
    this.auth.deleteSerie(serie)
      .subscribe( message=> {
        this.openSnackBar(message)
        this.series = this.series.filter(m => m !== serie),
        this.getUserSeries();
       })
  };

  ajde() {
    console.log('kurcina');
  }

}
