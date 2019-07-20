import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { DataService } from '../data.service';

@Component({
  selector: 'app-feature-preferences',
  templateUrl: './feature-preferences.component.html',
  styleUrls: ['./feature-preferences.component.scss']
})
export class FeaturePreferencesComponent implements OnInit {

  @Output() completed = new EventEmitter<boolean>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  FeatureType = {'t1': 'numeric', 't2': 'categorical'};
  featuresReceived;
  targetFeatureindex = -1;
  ready = false;
  @Input() forClassification;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.dataservice.featuresReady.subscribe(features => {
      this.onFeaturesReceived(features);
      this.ready = true;
    });
  }

  onFeaturesReceived(_received: any) {
    _received.forEach(feature => {
      feature.preferences = feature.preferences ? feature.preferences : {};
      feature.preferences.zeroAllowed = feature.preferences.zeroAllowed === undefined ? false : feature.preferences.zeroAllowed;
      feature.preferences.negativeAllowed = feature.preferences.negativeAllowed === undefined ? false : feature.preferences.negativeAllowed;
      feature.preferences.categories = feature.preferences.categories === undefined ? [] : feature.preferences.categories;
    });
    this.featuresReceived = _received;
    this.targetFeatureindex = _received.length - 1;
  }

  addCategory(featureIndex: any, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.featuresReceived[featureIndex].preferences.categories.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    console.log(this.featuresReceived[featureIndex].preferences.categories);
  }

  removeCategory(featureIndex: any, category: String): void {
    const index = this.featuresReceived[featureIndex].preferences.categories.indexOf(category);

    if (index >= 0) {
      this.featuresReceived[featureIndex].preferences.categories.splice(index, 1);
    }
    console.log(this.featuresReceived[featureIndex].preferences.categories);

  }

  onZeroAllowedChange(featureIndex, event: any) {
    this.featuresReceived[featureIndex].preferences.zeroAllowed = event.checked;
  }

  onNegAllowedChange(featureIndex, event: any) {
    this.featuresReceived[featureIndex].preferences.negativeAllowed = event.checked;
  }

  onFeatureNameInput(featureIndex, event: any) {
    this.featuresReceived[featureIndex].name = event.target.value;
  }

  saveAndStartProcessing() {
    if (null != this.featuresReceived) {
      this.featuresReceived.forEach(feature => {
        if (feature.type === this.FeatureType.t1) {
          delete feature.preferences.categories;
        } else if (feature.type === this.FeatureType.t2) {
          delete feature.preferences.negativeAllowed;
          delete feature.preferences.zeroAllowed;
        }
      });
      const payload = {features: this.featuresReceived};
      if (this.forClassification) {
        payload['targetFeatureIndex'] = this.targetFeatureindex;
      }
      this.dataservice.sendFeaturesPayload(payload, this.completed);
    } else {
      alert('Please wait');
    }
  }

}
