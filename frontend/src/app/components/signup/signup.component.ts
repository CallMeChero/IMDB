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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public error;
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
        Validators.required
      ],
    email: ['',
      Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    ])],
    password: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]|\d){6,12}')
      ])
    ],
    password_confirmation:[ '', 
      Validators.compose([
        Validators.required,
        Validators.pattern('^([a-zA-Z]|\d){6,12}'),
        // PasswordValidation.MatchPassword
    ])]
  },{ validator: PasswordValidation.MatchPassword });


  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private auth:AuthService
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    this.auth.signUp(this.signupForm.value)
              .subscribe(
                data => console.log(data),
                error => this.handleError(error)
              );
  }

  handleError(error) {
    this.error = error.error.error;
    this.openSnackBar(this.error);
  }

  openSnackBar(error) {
    this.snackBar.open(error,this.action ? this.actionButtonLabel : undefined);
  }

}
