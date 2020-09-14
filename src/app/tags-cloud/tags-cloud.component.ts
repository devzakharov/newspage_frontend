import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../_alert';
import {filter} from 'rxjs/operators';
import {CloudData, CloudOptions, TagCloudComponent, ZoomOnHoverOptions} from 'angular-tag-cloud-module';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.css']
})

export class TagsCloudComponent implements OnInit {

  cloudOptions: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 350,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  zoomOnHoverOptions: ZoomOnHoverOptions = {
    scale: 1.3, // Elements will become 130 % of current zize on hover
    transitionTime: 1.2, // it will take 1.2 seconds until the zoom level defined in scale property has been reached
    delay: 0.0 // Zoom will take affect after 0.8 seconds
  };

  cloudData: CloudData[] = [];
  temporaryCloudData: CloudData[] = [];
  tagCloudObject: object;

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

      // TODO передать ответственность за отсеевание тегов на бекенд
      for (const [key, value] of Object.entries(data)) {
        // if (value > 8) {
          // this.temporaryCloudData.push({text: key, weight: value, link: '/filter?tag=' + key});
          this.temporaryCloudData.push({text: key, weight: value});
        // }
      }

      this.cloudData = this.temporaryCloudData;

      // this.cloudData = this.temporaryCloudData;

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

