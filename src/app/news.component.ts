import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

class PreviewArticleItem {
  date: string;
  header: string;
  // previewText: string;
  anonsText: string;
  done: boolean;
  image: string;

  constructor(header: string, date: string, anonsText: string, image: string) {

    this.header = header;
    this.date = date;
    this.anonsText = anonsText;
    // this.previewText = anonsText.slice(0, 150) + '...';
    this.image = image;
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
  articles: PreviewArticleItem[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.sendRequest();
  }

  addPreviewArticle(header, date, anonsText, image): void {
    this.articles.push(new PreviewArticleItem(header, date, anonsText, image));
  }

  sendRequest(): void {
    const body = JSON.stringify({limit: this.limit, offset: this.offset});
    this.http.post<any>('http://localhost:5656/articles', body).subscribe(data => {
      if (data) {
        console.log('Data: ', data);
        data.forEach(item => {
          this.addPreviewArticle(item.header, item.date, item.anonsText, item.image);
        });
        this.offset += this.limit;
      }
    });
  }

  onScroll(): void {
    console.log('scrolled!!');
    this.sendRequest();
  }
}


