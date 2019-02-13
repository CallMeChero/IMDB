import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/helpers/password.validator';
import {Location} from '@angular/common';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error;
  public err;
  actionButtonLabel: string = 'Retry';
  action: boolean = true;

  login_validation_messages = {
    'username': [
      { type: 'required', message: 'username is required' },
      { type: 'pattern', message: 'Your username must be between 6 and 15 characters' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter valid email adress' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Your password must be between 6 and 12 characters' }
    ],
    'password_confirmation': [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Your password must be between 6 and 12 characters' },
      { type: 'MatchPassword', message: 'Passwords must match' }
    ]
    }

  signupForm = this.fb.group({
    username:[
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$')
        ])
      ],
    email: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    ])
  ],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9]{3,}')
      ])
    ],
    password_confirmation:[ 
      '', 
      Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9]{3,}'),
        // PasswordValidation.MatchPassword
    ])]
  },{ validator: PasswordValidation.MatchPassword });


  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private auth:AuthService,
    private location: Location,
    private token:TokenService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.auth.signUp(this.signupForm.value)
              .subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
              );
  }

  handleResponse(data) {
    this.token.handle(data);
    this.token.changeAuthStatus(true);
    this.router.navigateByUrl('/profile/'+data.user);
  }

  handleError(errors) {
    console.log(errors)
    this.err = Object.values(errors.error.errors);
    this.error = '';
      this.err.forEach(function(obj, index) {
        if(obj != undefined) {
          this.error += obj + '. ';
        }
      }, this);
    this.openSnackBar(this.error);
  }

  openSnackBar(error) {
    console.log(error);
    this.snackBar.open(error,this.action ? this.actionButtonLabel : undefined);
  }

  goBack() {
    this.location.back();
  }

}
