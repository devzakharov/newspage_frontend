import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {RegisterService} from '../../register.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { AlertService } from '../alert';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['../app.component.css', '../login/login.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm;
  // protected alertService: AlertService;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    // private RegisterService: RegisterService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    protected alertService: AlertService
  ) {
      this.registerForm = this.formBuilder.group({
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
    const body = JSON.stringify({login: userData.login, email: userData.email, password: userData.password});
    this.http.post('http://localhost:5656/register', body).subscribe(data => {
      console.log('Response: ', data);
      this.alertService.success(data.toString(), this.options);
    }, (err) => {
      console.log(err.error);
      if (Array.isArray(err.error)) {
        err.error.forEach(val => this.alertService.error(val, this.options));
      } else {
        this.alertService.error(err.error, this.options);
      }
    });
  }
}


