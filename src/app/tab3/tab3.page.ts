import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { LoadingService } from '../services/loading.service';
import { GeotoolsService } from '../services/geotools.service';
import { MockdataService } from '../services/mockdata.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private showPlaces = false;
  private sortedPlaces: any[];

  constructor(public geolocation: Geolocation, public loadingService: LoadingService, public geotoolsService: GeotoolsService, public mockdataService: MockdataService) { }

  private geoTest() {
    let originalPlaces = this.mockdataService.getClonedPlaces();
    // console.log(originalPlaces);
    this.sortedPlaces = this.mockdataService.getClonedPlaces();
    this.loadingService.present({
      // spinner: null,
      // duration: 5000,
      message: 'Please wait for geolocation...',
      // translucent: true,
      // cssClass: 'custom-class custom-loading'
    });
    this.geolocation.getCurrentPosition({ maximumAge: 30000, timeout: 50000, enableHighAccuracy: true }).then((resp) => {
      this.loadingService.dismiss();
      let myPosition: Coordinates = resp.coords;
      this.geotoolsService.sortPlaces(this.sortedPlaces, myPosition.latitude, myPosition.longitude);
      // console.log(this.sortedPlaces);
      this.showPlaces = true;
    }).catch((error) => {
      this.loadingService.dismiss();
      console.log('Error getting location', error);
      alert('Error getting location');
    });
  }

}
