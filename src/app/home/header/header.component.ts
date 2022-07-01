import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username!:any;
  url:boolean = false;
  constructor( private route:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("username")!=null){
      this.username = localStorage.getItem("username");
      this.url = true;
    }
  }

  logout(){
    localStorage.removeItem("username");
    this.url = false;
    this.route.navigate(['']);
  }

}
