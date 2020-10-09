import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharedService {

  private tagsArray = new BehaviorSubject([]);
  currentArray = this.tagsArray.asObservable();
  private dateFrom = new BehaviorSubject([]);
  private dateTo = new BehaviorSubject([]);
  currentDateFrom = this.dateFrom.asObservable();
  currentDateTo = this.dateTo.asObservable();
  private articlesArray = new BehaviorSubject([]);
  currentArticlesArray = this.articlesArray.asObservable();
  private searchQuery = new BehaviorSubject('');
  currentSearchQuery = this.searchQuery.asObservable();

  constructor() {}

  changeTagsArray(value: Array<string>): void {
    this.tagsArray.next(value);
  }

  setFilterValues(from: any, to: any): void {
    this.dateFrom.next(from);
    this.dateTo.next(to);
  }

  changeArticlesArray(articlesArray: any): void {
    this.articlesArray.next(articlesArray);
  }

  updateSearchField(searchQuery: string): void {
    this.searchQuery.next(searchQuery);
  }
}
