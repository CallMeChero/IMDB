import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = 'http://localhost:8000/api';

  constructor(private http:HttpClient) { }

  signUp(data) {
    return this.http.post(this.baseURL + '/signup',data);
  }
  login(data) {
    return this.http.post(this.baseURL + '/login',data);
  }
  sendPasswordResetLink(data) {
    return this.http.post(this.baseURL + '/resetPasswordResetLink',data);
  }

  changePassword(data) {
    return this.http.post(this.baseURL + '/changePassword',data);
  }
  getMovies() {
    return this.http.get(this.baseURL + '/movies');
  }

  getUserMovies(data) {
    // Setup log namespace query parameter
    //let params = new HttpParams().set('username', data.data);
    return this.http.get(this.baseURL + '/movies/'+ data);
  }

  sumbmitMovie(data) {
    return this.http.post(this.baseURL + '/movies',data);
  }

  deleteMovie(id: number) {
    return this.http.post(this.baseURL + '/delete_movie', id);
  }

  editMovie(data) {
    return this.http.put(this.baseURL + '/edit_movie', data);
  }

  getGenres() {
    return this.http.get(this.baseURL + '/genres');
  }

  getUserSeries(data) {
    return this.http.get(this.baseURL + '/series/'+ data);
  }

  sumbmitSerie(data) {
    return this.http.post(this.baseURL + '/series',data);
  }

  editSerie(data) {
    return this.http.put(this.baseURL + '/edit_serie', data);
  }

  deleteSerie(id: number) {
    return this.http.post(this.baseURL + '/delete_serie', id);
  }

  searchUserMovies(value,username) {
    const  params = new  HttpParams().set('username', username).set('value',value);
    return this.http.get(this.baseURL + '/search_movie', {params});
  }

  searchSerieFilter(value,username) {
    const  params = new  HttpParams().set('username', username).set('value',value);
    return this.http.get(this.baseURL + '/search_serie', {params});
  }

  getActors() {
    return this.http.get(this.baseURL + '/actors');
  }

  getDirectors() {
    return this.http.get(this.baseURL + '/directors');
  }
}
