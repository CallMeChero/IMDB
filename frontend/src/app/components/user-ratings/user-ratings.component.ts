import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.css']
})
export class UserRatingsComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private token: TokenService
  ) { }

  public tableData;
  public movies;
  public tokenData;
  public username;
  public series;

  public displayedColumns = ['rating','name', 'release_year','actors', 'directors', 'created_at']
  public movieData;
  public serieData;


  @ViewChild('moviePaginator') moviePaginator: MatPaginator;
  @ViewChild('movieSort') movieSort: MatSort;

  @ViewChild('seriePaginator') seriePaginator: MatPaginator;
  @ViewChild('serieSort') serieSort: MatSort;

  ngOnInit() {
    this.getLoggedUser();
    this.getUserMovies();
    this.getUserSeries();
  }

  /*get user*/
  getLoggedUser() {
    this.tokenData = JSON.parse(this.token.getStorage());
    return this.tokenData.user
  }

  /* get movies */
  getUserMovies() {
    this.auth.getUserMovies(this.getLoggedUser())
      .subscribe(
        data => this.handleResponse(data),
        error => console.log(error)
      )
  }
  
  handleResponse(data) {
    this.movies = data;
    this.movieData = new MatTableDataSource(this.movies);
    this.movieData.paginator = this.moviePaginator;
    this.movieData.sort = this.movieSort;
    console.log(this.movies);
  }

  applyMovieFilter(filterValue: string) {
    this.movieData.filter = filterValue.trim().toLowerCase();

    if (this.movieData.paginator) {
      this.movieData.paginator.firstPage();
    }
  }

  /* get series */
  getUserSeries() {
  this.auth.getUserSeries(this.getLoggedUser())
    .subscribe(
      data => this.handleSeriesResponse(data),
      error => console.log(error)
    )
  }
  
  handleSeriesResponse(data) {
    this.series = data;
    console.log(this.series);
    this.serieData = new MatTableDataSource(this.series);
    this.serieData.paginator = this.seriePaginator;
    this.serieData.sort = this.serieSort;
  }

  applySerieFilter(filterValue: string) {
    this.serieData.filter = filterValue.trim().toLowerCase();

    if (this.serieData.paginator) {
      this.serieData.paginator.firstPage();
    }
  }

}
