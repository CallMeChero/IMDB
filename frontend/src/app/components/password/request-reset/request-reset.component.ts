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
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  public error;
  actionButtonLabel: string = 'Okay';
  action: boolean = true;

  request_reset_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter valid email adress' }
    ]}

  requestResetForm = this.fb.group({
    email: ['',Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')
    ])]
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
    this.auth.sendPasswordResetLink(this.requestResetForm.value).subscribe(
                data => this.handleResponse(data),
                error => this.handleError(error)
              );
  }

  handleError(error) {
    console.log(error);
    this.error = error.error.error;
    this.openSnackBar(this.error);
  }

  handleResponse(data) {
    console.log(data.data);
    this.snackBar.open(data.data,this.action ? this.actionButtonLabel : undefined);
    //this.router.navigateByUrl('/login');
  }

  openSnackBar(error) {
    console.log(error);
    this.snackBar.open(error,this.action ? this.actionButtonLabel : undefined);
  }

}
