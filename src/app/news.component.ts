import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { MatSliderModule } from '@angular/material/slider';

class PreviewArticleItem {

  id: string;
  description: string;
  image: string;
  title: string;
  photo: string;
  anons: string;
  category: string;
  publishDate: string;

  constructor(
    id: string,
    description: string,
    image: string,
    title: string,
    photo: string,
    anons: string,
    category: string,
    publishDate: string) {

    this.id = id;
    this.description = description;
    this.image = image;
    this.title = title;
    this.photo = photo;
    this.anons = anons;
    this.category = category;
    this.publishDate = publishDate;

  }
}

// class FilterOptions {
//   fromDate: string;
//   toDate: string;
//   author: string;
//
//   constructor() {
//     this.fromDate = 'mock';
//     this.toDate = 'mock';
//     this.author = 'mock';
//   }
// }

@Component({
  selector: 'app-root',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})


export class NewsComponent implements OnInit{
  limit = 10;
  offset = this.limit;
  news: PreviewArticleItem[] = [];


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.sendRequest();
  }

  addNewsItem(
    // tslint:disable-next-line:max-line-length
    id: string, description: string, image: string, title: string, photo: string, anons: string, category: string, publishDate: string): void {
    this.news.push(new PreviewArticleItem(id, description, image, title, photo, anons, category, publishDate));
  }

  sendRequest(): void {
    this.http.post<any>(
      'http://localhost:5656/articles?offset=' + this.offset + '&limit=' + this.limit,
      {}).subscribe(data => {
      console.log('Data: ', data);
      data.forEach(article => {
        this.addNewsItem(
          article.id,
          this.b64DecodeUnicode(article.description),
          article.image,
          this.b64DecodeUnicode(article.title),
          article.photo,
          this.b64DecodeUnicode(article.anons),
          article.category,
          moment(article.publishDate).format('DD.MM.YYYY hh:mm')
        );
      });
      this.offset += this.limit;
    });
  }

  onScroll(): void {
    this.sendRequest();
  }

  b64DecodeUnicode(str): string {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

}


