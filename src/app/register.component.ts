import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {LoginService} from '../login.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html'
  // styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {
  loginForm;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
      this.loginForm = this.formBuilder.group({
        login: '',
        email: '',
        password: ''
      });
  }

  ngOnInit(): void {
  }

  onSubmit(userData): void {
    // this.loginForm.reset();
    this.sendRequest(userData);
    console.warn('Your data: ', userData);
  }

  sendRequest(userData): void {
    const body = '{ "login" : ' + userData.login +
      ', "email" : ' + userData.email +
      ', "password" : ' + userData.password +
      ' }';
    this.http.post('http://localhost:5656/register', body).subscribe(data => {
      console.log('Response: ', data);
    });
  }

}

