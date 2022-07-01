import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Bus } from '../tables/Bus';

@Injectable({
  providedIn: 'root'
})
export class BusService {

  private busURL= "https://localhost:44397/api/Bus";

  constructor(private http:HttpClient) { }

  getBuses():Observable<Bus[]>{
    var data = this.busURL+"/Get";
    return this.http.get<Bus[]>(data);
  }

}
