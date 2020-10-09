import {Component, OnInit, TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { FilterOptions } from '../domain/FilterOptions';
import { PreviewArticle } from '../domain/PreviewArticle';
import {SharedService} from '../services/shared.service';
import {EventEmitterService} from '../services/event.emitter.service';
import {MatDialog} from '@angular/material/dialog';
import {FullArticleComponent} from '../article-full/full-article.component';


@Component({
  selector: 'app-root',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})


export class ArticlesComponent implements OnInit{

  filterOptions: FilterOptions = new FilterOptions();
  articles: PreviewArticle[] = [];

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private eventEmitterService: EventEmitterService,
    public dialog: MatDialog
  ) {
    moment.locale('ru');
  }

  ngOnInit(): void {

    this.sendRequest();

    this.sharedService.currentArray.subscribe(arr => this.filterOptions.tags = arr);

    this.sharedService.currentDateFrom.subscribe(val => {
      if (val != null) {
        this.filterOptions.fromDate = moment(val.toString()).format('YYYY-MM-DD');
        this.articles = [];
      }
    });

    this.sharedService.currentArticlesArray.subscribe( arr => {
      this.articles = [];
      this.articles = arr;
    });

    this.sharedService.currentDateTo.subscribe(val => {
      if (val != null) {
        this.filterOptions.toDate = moment(val.toString()).format('YYYY-MM-DD');
        // console.log(this.filterOptions.toDate);
        this.articles = [];
      }
    });

    this.sharedService.currentSearchQuery.subscribe(value => {
      if (value !== '') {
        this.filterOptions.searchQuery = value;
        console.log('articles.component получает значение ' + value);
      }
    });

    if (this.eventEmitterService.subsVar === undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeSendRequestFunction.subscribe(() => {
        this.articles = [];
        this.filterOptions.offset = 0;
        this.sendRequest();
      });
    }
  }

  addNewsItem(
    // tslint:disable-next-line:max-line-length
    id: string, description: string, image: string, title: string, photo: string, anons: string, category: string, publishDate: string): void {
    this.articles.push(new PreviewArticle(id, description, image, title, photo, anons, category, publishDate));
  }

  sendRequest(): void {
    this.http.post<any>(
      'http://localhost:5656/articles' + this.filterOptions.getParametersString(),
      {}).subscribe(data => {
        console.log('URL: http://localhost:5656/articles' + this.filterOptions.getParametersString());
        // console.log('Data: ', data);
        if (data !== null) {
          data.forEach(article => {
            this.addNewsItem(
              article.id,
              this.b64DecodeUnicode(article.description),
              article.image,
              this.b64DecodeUnicode(article.title),
              article.photo,
              this.b64DecodeUnicode(article.anons),
              article.category,
              moment(article.publishDate).format('LLLL')
            );
          });
        }
    });
  }

  onScroll(): void {
    this.filterOptions.updateOffset();
    this.sendRequest();
  }

  b64DecodeUnicode(str): string {
    return decodeURIComponent(atob(str).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  openFullArticle(id): void {

    console.log('From openFullArticle ' + id);
    const dialogRef = this.dialog.open(FullArticleComponent, { data : id });
    console.log(dialogRef);
  }


}




