import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusService } from 'src/app/services/bus.service';
import { Bus } from 'src/app/tables/Bus';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrls: ['./buses.component.css']
})
export class BusesComponent implements OnInit {
  from!:string;
  to!:string;
  date!:Date;
  busdetails!:Bus[];
  booleanRating:boolean= false;
  tableHeader:string[] = ["Name","Departure Time","Rating"];
  avail_date:string = "";
  pipe = new DatePipe('en-US');
  constructor(private bus:BusService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.from = this._Activatedroute.snapshot.params['from'];
    this.to = this._Activatedroute.snapshot.params['to'];
    this.date = this._Activatedroute.snapshot.params['date'];
    this.bus.getBuses().subscribe(data => 
      (this.busdetails=data,
      console.log(this.busdetails))
      )};

  get(){

  }

  check(a:Bus):boolean{
    var table_date = this.pipe.transform(a.available_date , 'yyyy-MM-dd');
    var entered_date = this.pipe.transform(this.date , 'yyyy-MM-dd');
    if(a.from_location == this.from && a.to_location== this.to && table_date == entered_date){
      return true;
    }
    else{
      return false;
    }
    
  }

  sortRating(colName:string,boolean:boolean){
  //  if (boolean == true){
  //     this.busdetails.sort((a, b) => a.colName < b.colName ? 1 : a.colName > b.colName ? -1 : 0)
  //    // this.busdetails.sort((a, b) => a.colName < b.colName ? 1 : a.colName > b.colName ? -1 : 0)
  //     this.booleanRating = !this.booleanRating
  // }
  // else{
  //     this.busdetails.sort((a, b) => a.colName > b.colName ? 1 : a.colName < b.colName ? -1 : 0)
  //     this.booleanRating = !this.booleanRating
      
  // }

  const opt = [...this.busdetails];
  opt.sort((a, b) => (
    // your sort logic
    a.rating - b.rating // example : order by id
  ));
  console.log()
  }

}
