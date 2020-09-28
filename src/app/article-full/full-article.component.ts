import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ArticlesComponent} from '../articles/articles.component';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {PreviewArticle} from '../domain/PreviewArticle';

@Component({
  selector: 'app-article-full',
  templateUrl: './full-article.component.html',
  styleUrls: ['./full-article.component.css']
})

export class FullArticleComponent implements OnInit {

  article: PreviewArticle = new PreviewArticle('', '', '', '', '', '', '', '');
  id: string;

  constructor(
    public dialogRef: MatDialogRef<ArticlesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.id = data;
    this.sendRequest();
  }

  ngOnInit(): void {
  }

  sendRequest(): void {
    this.http.post<any>(
      'http://localhost:5656/article?id=' + this.id, {}).subscribe(data => {
      if (data !== null) {
        console.log(data);

        this.addArticle(
          data.id,
          this.b64DecodeUnicode(data.description),
          data.image,
          this.b64DecodeUnicode(data.title),
          data.photo,
          this.b64DecodeUnicode(data.anons),
          data.category,
          // moment(article.publishDate).format('DD.MM.YYYY hh:mm')
          moment(data.publishDate).format('LLLL'),
          this.b64DecodeUnicode(data.articleHtml)
        );

      } else {
        console.log('empty response');
      }
    });
  }

  // tslint:disable-next-line:max-line-length
  private addArticle(id: string, description: string, image: string, title: string, photo: string, anons: string, category: string, publishDate: string, fullText: string): void {
    this.article = new PreviewArticle(id, description, image, title, photo, anons, category, publishDate);
    this.article.setFullText(fullText);
  }

  b64DecodeUnicode(str): string {
    return decodeURIComponent(atob(str).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

}
