import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {RegisterService} from '../../register.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css', './login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm;

  constructor(
    private loginService: RegisterService,
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
    this.sendRequest(userData);
    console.warn('Your data: ', userData);
  }

  sendRequest(userData): void {
    const body = '{ "login" : "' + userData.login +
      '", "password" : "' + userData.password +
      '" }';
    this.http.post('http://localhost:5656/login', body).subscribe(data => {
      console.log('Response: ', data);
    });
  }

}

