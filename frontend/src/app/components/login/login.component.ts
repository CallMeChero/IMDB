import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  login_validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter valid email adress' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'pattern', message: 'Your password must be between 6 and 12 characters' }
    ]
    }

  //Validators.pattern(this.EMAIL_REGEX)
  //private EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  loginForm = this.fb.group({
    email: ['',Validators.compose([
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
  });
  
  constructor(
    private fb: FormBuilder,
    private http:HttpClient
  ) { }

  ngOnInit() {
  }
  onSubmit() {
    return this.http.post('http://localhost:8000/api/auth/login', this.loginForm.value)
              .subscribe(
                data => console.log(data),
                error => console.log(error)
              );
  }

}
