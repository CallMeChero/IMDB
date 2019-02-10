import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: 'http://localhost:8000/api/login',
    signup: 'http://localhost:8000/api/signup'
  };
  private logged = new BehaviorSubject<boolean>(this.loggedIn());
  authStatus = this.logged.asObservable(); //kadgod se promjeni loggedIn u false, odmah se triggera

  constructor() { }

  handle(token) {
    this.setStorage(token);
    console.log(this.isValid());
  }

  setStorage(data) {
    localStorage.setItem('token', data);
  }

  getStorage() {
    return localStorage.getItem('token');
  }

  removeStorage() {
    return localStorage.removeItem('token');
  }

  isValid() {
    const token = this.getStorage();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false
      }
      return false;
    }
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }

  changeAuthStatus(value: boolean){
    this.logged.next(value);
  }
}
