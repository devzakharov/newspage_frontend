import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {RegisterComponent} from './register.component';
import {LoginService} from '../login.service';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes =[
  { path: 'register', component: RegisterComponent},
  { path: '', component: AppComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [LoginService],
  bootstrap: [AppComponent, RegisterComponent]
})
export class AppModule { }
