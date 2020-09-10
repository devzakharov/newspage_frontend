import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../_alert';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.css']
})

export class TagsCloudComponent implements OnInit {

  tagCloudObject: object;
  tagCloudFilteredObject: CloudData[] = [];

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private http: HttpClient,
    protected alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.sendRequestAndFillObject();
  }

  sendRequestAndFillObject(): void {
    this.http.post('http://localhost:5656/tags?getalltags=1', {}).subscribe(data => {
      console.log('Response: ', data);
      this.tagCloudObject = data;
      let counter = 0;
      for (const [key, value] of Object.entries(data)) {
        if (value > 3) {
          this.tagCloudFilteredObject[counter].text = key;
          this.tagCloudFilteredObject[counter].weight = value;
         // console.log(`${key}: ${value}`);
        }
        counter++;
      }
      console.log(this.tagCloudFilteredObject);
      this.alertService.success(data.toString(), this.options);
    }, (err) => {
      console.log(err.error);
      if (Array.isArray(err.error)) {
        err.error.forEach(val => this.alertService.error(val, this.options));
      } else {
        this.alertService.error(err.error, this.options);
      }
    });
  }
}

type CloudData = {
  text: string;
  weight: number;
};


