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
    console.log(data);
    return this.http.get(this.baseURL + '/movies/'+ data);
  }
}
