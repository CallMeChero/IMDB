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
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordValidation } from 'src/app/helpers/password.validator';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  public error;
  actionButtonLabel: string = 'Retry';
  actionButtonSuccess: string = 'Okay';
  action: boolean = true;
  private acceptedToken;

  response_reset_messages = {
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

  responseResetForm = this.fb.group({
    reset_token: [
    ],
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
    password_confirmation:[ 
      '', 
      Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z0-9]{3,}'),
    ])]
  },{ validator: PasswordValidation.MatchPassword });


  
  constructor(
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
    private auth:AuthService,
    private token:TokenService,
    private router: Router,
    private _rout: ActivatedRoute
  ) { 
    _rout.queryParams.subscribe(params => {
      this.acceptedToken = params['token'];
    });
  }

  ngOnInit() {
  }
  onSubmit() {
    this.responseResetForm.value.reset_token = this.acceptedToken;
    this.auth.changePassword(this.responseResetForm.value).subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
              );
  }

  handleResponse(data) {
    this.snackBar.open(data.data,this.action ? this.actionButtonSuccess : undefined);
  }

  handleError(error) {
    this.error = error.error.error;
    this.openSnackBar(this.error);
  }

  openSnackBar(error) {
    this.snackBar.open(error,this.action ? this.actionButtonLabel : undefined);
  }
}
