import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../tables/User';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL= "http://localhost:3000/user";
  private apiUrl = "https://localhost:44397";

  constructor(private http:HttpClient) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.userURL);
  }

  get(username:string,password:string) {
    return this.http.get("https://localhost:44397/api/Users/gettoken?name="+username+"&password="+password);
  }

  addUsers(user:User){
    console.log(user);
    var data = this.apiUrl+"/api/Users/Register";
    return this.http.post(data, user, httpOptions);
  }
}


