import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SharedService {

  private tagsArray = new BehaviorSubject([]);
  currentArray = this.tagsArray.asObservable();

  constructor() {}

  changeArray(value: Array<string>): void {
    this.tagsArray.next(value);
  }
}
