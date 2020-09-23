import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SharedService} from '../services/shared.service';
import {EventEmitterService} from '../services/event.emitter.service';
import * as moment from 'moment';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})

export class DatepickerComponent implements OnInit {

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(
    private sharedService: SharedService,
    private eventEmitterService: EventEmitterService
  ) {
  }

  ngOnInit(): void {
    this.sharedService.currentDateFrom.subscribe(val => {
        this.range.value.start = val;
    });
    this.sharedService.currentDateTo.subscribe(val => {
        this.range.value.end = val;
    });
  }

  rangeChange(): void {
    this.sharedService.setFilterValues(this.range.value.start, this.range.value.end);
    this.eventEmitterService.onTagFilterChange();
  }

}
