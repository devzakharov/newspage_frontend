import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlertService} from '../alert';
import {TagsCloud} from '../domain/TagsCloud';
import {SharedService} from '../services/shared.service';
import {EventEmitterService} from '../services/event.emitter.service';

@Component({
  selector: 'app-tags-cloud',
  templateUrl: './tags-cloud.component.html',
  styleUrls: ['./tags-cloud.component.css']
})


export class TagsCloudComponent implements OnInit {

  cloudData: TagsCloud[] = [];
  temporaryCloudData: TagsCloud[] = [];
  tagCloudObject: object;
  selectedTagsArray: Array<string> = [];

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private http: HttpClient,
    protected alertService: AlertService,
    private sharedService: SharedService,
    private eventEmitterService: EventEmitterService
  ) {

  }

  ngOnInit(): void {
    this.sendRequestAndFillObject();
    this.sharedService.currentArray.subscribe(arr => this.selectedTagsArray = arr);
  }

  sendRequestAndFillObject(): void {

    this.http.get('http://localhost:5656/api/v1/tags?getalltags=1', {}).subscribe(data => {

      // console.log('Response: ', data);

      this.tagCloudObject = data;

      for (const [key, value] of Object.entries(data)) {
          this.temporaryCloudData.push({text: key, weight: value, selected: false});
      }

      this.cloudData = this.temporaryCloudData;

      // this.alertService.success(data.toString(), this.options);

    }, (err) => {
      console.log(err.error);
      if (Array.isArray(err.error)) {
        err.error.forEach(val => this.alertService.error(val, this.options));
      } else {
        this.alertService.error(err.error, this.options);
      }
    });
  }

  changeSelected($event, tag): void {
    tag.selected = $event.selected;
  }

  addToFilterQueryArray(tag): void {
    console.log('added: ' + tag.text);
    this.selectedTagsArray.push(tag.text);
    this.sharedService.changeTagsArray(this.selectedTagsArray);
    this.eventEmitterService.onTagFilterChange();
  }

  removeFromFilterQueryArray(tag): void {
    console.log('removed: ' + tag.text);
    const index = this.selectedTagsArray.indexOf(tag.text);
    if (index > -1) {
      this.selectedTagsArray.splice(index, 1);
    }
    this.sharedService.changeTagsArray(this.selectedTagsArray);
    this.eventEmitterService.onTagFilterChange();
  }

  tagAction(tag, chip): void {
    if (tag.selected) {
      chip.deselect();
      this.removeFromFilterQueryArray(tag);
    } else {
      chip.selectViaInteraction();
      this.addToFilterQueryArray(tag);
    }
  }
}
