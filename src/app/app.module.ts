import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {RegisterComponent} from './register/register.component';
import {RegisterService} from '../register.service';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ArticlesComponent} from './articles/articles.component';
import { AlertModule } from './alert';
import { TagsCloudComponent } from './tags-cloud/tags-cloud.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { TippyModule } from 'ng-tippy';
import {MatChipsModule} from '@angular/material/chips';
import {SharedService} from './services/shared.service';
import { DatepickerComponent } from './datepicker/datepicker.component';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import { FullArticleComponent } from './article-full/full-article.component';
import {MatDialogModule} from '@angular/material/dialog';
import { ScrollTopComponent } from './scroll-top/scroll-top.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopSearchComponent } from './top-search/top-search.component';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  // { path: '', component: AppComponent},
  { path: '', redirectTo: '/app', pathMatch: 'full'},
  { path: 'app', component: ArticlesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ArticlesComponent,
    TagsCloudComponent,
    DatepickerComponent,
    FullArticleComponent,
    ScrollTopComponent,
    TopSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule,
    TagCloudModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    TippyModule,
    MatChipsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    FontAwesomeModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  providers: [
    RegisterService,
    SharedService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
