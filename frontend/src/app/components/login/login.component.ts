import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  public error;
  actionButtonLabel: string = 'Retry';
  action: boolean = true;

  login_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter valid email adress' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Your password must be between 6 and 12 characters' }
    ]}

  loginForm = this.fb.group({
    email: ['',Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    ])],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9]{3,}')
      ])
    ],
  });


  
  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private auth:AuthService,
    private token:TokenService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.auth.login(this.loginForm.value).subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
              );
  }

  handleError(error) {
    this.error = error.error.error;
    this.openSnackBar(this.error);
  }

  handleResponse(data) {
    this.token.handle(data);
    this.token.changeAuthStatus(true);
    this.router.navigateByUrl('/profile/'+data.user);
  }

  openSnackBar(error) {
    console.log(error);
    this.snackBar.open(error,this.action ? this.actionButtonLabel : undefined);
  }

}