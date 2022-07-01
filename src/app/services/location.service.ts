import { Injectable } from '@angular/core';
import { Location } from '../tables/Location';
import { LOCATIONS } from '../tables/mock-locations';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  get(): Location[]{
    return LOCATIONS;
  }
}
