import { Component, OnInit } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {SharedService} from '../services/shared.service';
import {PreviewArticle} from '../domain/PreviewArticle';
import * as moment from 'moment';

@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent implements OnInit {
  variants: string[] = [];
  myControl = new FormControl();
  filteredVariants: Observable<string[]>;
  articlesArray: PreviewArticle[] = [];
  inputValue = '';

  constructor(
    private http: HttpClient,
    private sharedService: SharedService) { }

  onKeyPress(event): void {
    if (event.key === 'Enter') {
      this.requestArticles();
      // console.log(event.key);
    }
    // if (event.key === ' ') {
    //   console.log(event.key);
    // }
    if ((event.target.value.length > 3) && (event.target.value.length < 15)){
      this.inputValue = event.target.value;
      this.requestWordsList();
    } else {
      this.inputValue = '';
    }
  }

  ngOnInit(): void {
    this.sharedService.currentArticlesArray.subscribe(arr => this.articlesArray = arr);
    this.filteredVariants = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: any): string[] {
    const filterValue = value.toLowerCase();

    return this.variants.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit(event): void {
    event.preventDefault();
    // console.log('Вэлью: ' + this.inputValue);
    this.requestArticles();
  }

  requestWordsList(): void {
    this.http.post<any>('http://localhost:5656/suggestions?inputvalue=' + this.inputValue, {}).subscribe(data => {
      console.log(data);
      this.variants = [];
      // if (data !== null) {
        data.forEach(word => {
          this.variants.push(word);
        });
        this.ngOnInit();
      // }
    });

    this.variants.push(this.inputValue);
  }

  requestArticles(): void {
    console.log('Articles requested ' + this.inputValue);
    this.http.post<any>('http://localhost:5656/articles?search=' + this.inputValue, {}).subscribe(data => {
      // console.log(data);
      if (data !== null) {
        this.articlesArray = [];
        data.forEach(article => {
          this.addArticleItem(
            article.id,
            this.b64DecodeUnicode(article.description),
            article.image,
            this.b64DecodeUnicode(article.title),
            article.photo,
            this.b64DecodeUnicode(article.anons),
            article.category,
            // moment(article.publishDate).format('DD.MM.YYYY hh:mm')
            moment(article.publishDate).format('LLLL')
          );
        });
      }
    });
    console.log('Articles array: ', this.articlesArray);
    this.sharedService.changeArticlesArray(this.articlesArray);
  }


  addArticleItem(
    // tslint:disable-next-line:max-line-length
    id: string, description: string, image: string, title: string, photo: string, anons: string, category: string, publishDate: string): void {
    this.articlesArray.push(new PreviewArticle(id, description, image, title, photo, anons, category, publishDate));
  }

  b64DecodeUnicode(str): string {
    return decodeURIComponent(atob(str).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
