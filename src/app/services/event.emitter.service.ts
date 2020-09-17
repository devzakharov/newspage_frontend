import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeSendRequestFunction = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  onTagFilterChange(): void {
    this.invokeSendRequestFunction.emit();
  }

  // onDateFilterChange(): void {
  //   this.invokeSendRequestFunction.emit();
  // }
}
