import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

class NewsItem {
  date: string;
  header: string;
  previewText: string;
  fullText: string;
  done: boolean;

  constructor(header: string, date: string, fullText: string) {

    this.header = header;
    this.date = date;
    this.fullText = fullText;
    this.previewText = fullText.slice(0, 150) + '...';
    this.done = false;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent {
  title = 'newsapp';
  name = 'name';
  header = '';
  date = '';
  fullText = '';

  constructor(private http: HttpClient) { }

  news: NewsItem[] = [
    new NewsItem('Сенсация', new Date(1990, 8, 29).toDateString(), 'Сегодня под мостом поймали гитлера с хвостом'),
    new NewsItem('Молния', new Date().toDateString(), 'Внезапное событие!!'),
    new NewsItem('Важная новость', new Date(2030, 0, 31).toDateString(), 'RIP'),
    new NewsItem('Сенсация', new Date(1990, 8, 29).toDateString(), 'Сегодня под мостом поймали гитлера с хвостом'),
    new NewsItem('Молния', new Date().toDateString(), 'Внезапное событие!!'),
    new NewsItem('Важная новость', new Date(2030, 0, 31).toDateString(), 'RIP')
  ];

  addNewsItem(header: string, date: string, fullText: string): void {
    this.news.push(new NewsItem(header, date, fullText));
  }

  addFakeNews(): void {
    this.news.push(new NewsItem('Заголовок', new Date().toDateString(), 'FullText'));
  }

  sendRequest(): void {
    this.http.post<any>('http://localhost:8080/test', { title: 'Angular POST Request Example' }).subscribe(data => {
      console.log('Data: ', data);
    });
  }

  onScroll(): void {
    console.log('scrolled!!');
    this.addFakeNews();
  }
}


