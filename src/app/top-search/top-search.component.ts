import { Component, OnInit } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.css']
})
export class TopSearchComponent implements OnInit {
  variants: string[] = [];
  myControl = new FormControl();
  filteredVariants: Observable<string[]>;
  inputValue = '';

  constructor() { }

  onKeyPress(event): void {
    if (event.target.value.length > 3) {
      this.inputValue = event.target.value;
      console.log('Пук: ' + event.target.value);
    }
    this.inputValue = '';
  }

  ngOnInit(): void {
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
    console.log('Вэлью: ' + this.inputValue);
  }

}
