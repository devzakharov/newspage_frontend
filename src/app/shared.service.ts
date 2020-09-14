import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private filterObject = new BehaviorSubject('First Message');
  sharedFilterObject = this.filterObject.asObservable();

  constructor() { }

  setProperty(filterObject: any): void {
    this.filterObject.next(filterObject);
  }

}
