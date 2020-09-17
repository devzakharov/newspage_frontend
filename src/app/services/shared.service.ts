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


  constructor() {}

  changeTagsArray(value: Array<string>): void {
    this.tagsArray.next(value);
  }

  setFromToValues(from: any, to: any): void {
    this.dateFrom.next(from);
    this.dateTo.next(to);
  }
}
