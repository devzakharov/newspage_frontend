import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {RegisterComponent} from './register.component';
import {RegisterService} from '../register.service';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';
import {NewsComponent} from './news.component';
import { AlertModule } from './_alert';
import { TagsCloudComponent } from './tags-cloud/tags-cloud.component';
import { TagCloudModule } from 'angular-tag-cloud-module';

const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: AppComponent},
  { path: 'app', component: NewsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NewsComponent,
    TagsCloudComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule,
    TagCloudModule
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
