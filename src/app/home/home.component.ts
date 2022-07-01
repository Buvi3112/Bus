import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../services/location.service';
import { Location } from '../tables/Location';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
from:string="";
to!:string;
date!:string;
locs!:Location[];
productValue!:any[];
str:string='';

  constructor(private router:Router, private loc:LocationService) { }

  ngOnInit(): void {
    this.locs = this.loc.get();
    console.log(this.loc.get());
  }

  onLogin(){
    console.log(this.from, this.to, this.date);
  }

  onSearch(){
    this.router.navigate(['/buses', this.from, this.to, this.date]);
  }

  search(value: string): void {
    this.productValue = this.locs.filter((val) => val.location.toLowerCase().includes(value));
  }
}
