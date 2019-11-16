import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeotoolsService {

  constructor() { }

  private haversineDistance(lat1: number, long1: number, lat2: number, long2: number): number {
    // let R = 3958.8; // Radius of the Earth in miles
    let R: number = 6371.0710; // Radius of the Earth in km
    let rlat1: number = lat1 * (Math.PI / 180); // Convert degrees to radians
    let rlat2: number = lat2 * (Math.PI / 180); // Convert degrees to radians
    let difflat: number = rlat2 - rlat1; // Radian difference (latitudes)
    let difflon: number = (long2 - long1) * (Math.PI / 180); // Radian difference (longitudes)
    let d: number = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return d;
  }

  public sortPlaces(places: any[], refLat: number, refLong: number) {
    let that = this; // occhio a questo, Nicole!!!
    places.forEach(function (place) {
      place.distance = that.haversineDistance(place.latlng[0], place.latlng[1], refLat, refLong)
      place.distanceToPrint = place.distance.toFixed(2);
    });
    places = places.sort(function (a, b) {
      // Ordinamento crescente per distanza
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      return 0;
    });
  }

}
