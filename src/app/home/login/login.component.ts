import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/tables/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name!: string;
  gender!:string;
  password!: string;
  role!:string;
  email!: string;
  phone!:number;
  submitted:boolean = false;
  phone1!:number;email1!:string;password1!:string;
  userData:any;
  userDataLength:any;
  age!:number
  roleid!:number;
  //user!:User;
  id!:number;
  loginForm!:FormGroup;
  registerForm!:FormGroup;
  constructor(private formBuilder:FormBuilder, private user:UserService, private route:Router) {
    this.loginForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      password:new FormControl(null, [Validators.required])
    });

    this.registerForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      password1: new FormControl(null, [Validators.required]),
      email1: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      phone1: new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      role: new FormControl(null, [Validators.required]),
      age: new FormControl(null, [Validators.required])
    })
   }

   ngOnInit(): void {

    //this.user.get(this.name,this.password).subscribe((data)=> console.log(data))
    // this.user.getUsers().subscribe((data)=>
    //   ( this.userData = data,
    //     this.userDataLength = data.length)
    // );
    // console.log(this.userData);
  }

  get u () {return this.loginForm.controls}
  get v () {return this.registerForm.controls}

  onLogin(){
    this.submitted = true;
    if(this.loginForm.invalid){
      return;
    }
    console.log(this.password);
    // for(var i=0;i<this.userDataLength;i++){
      
    //   if(this.userData[i].email == this.email && this.userData[i].password == this.password){
    //     localStorage.setItem('username', this.userData[i].name);
    //     localStorage.setItem('role',this.userData[i].role)
    //     console.log(localStorage.getItem("username"));
    //     console.log("login successful");
    //     this.route.navigate(['']);
    //   }
    //   else{
    //     console.log("error");
    //   }
    // }
    this.user.get(this.name,this.password).subscribe((data)=> {
        if(data!="error"){
          localStorage.setItem("username",this.name);
        console.log(data);
        this.route.navigate(['']);
        }else{
          alert("Please check your credentials");
          this.route.navigate(['/login']);
        }
     
    });
    // (err : HttpErrorResponse)=>{
    //   localStorage.removeItem("username");
    //     alert("Please check your credentials");
      
    //   this.route.navigate(['/login']);
    // });
  }

  onRegister(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.getId();
    if(this.role == "admin"){
      this.roleid = 1;
    }else if(this.role == "busowner"){
      this.roleid =2;
    }else{
      this.roleid =3;
    }
    const newUser = {
      id:this.id,
      email:this.email1,
      name:this.name,
      gender:this.gender,
      password:this.password1,
      roleid:this.roleid,
      phone:this.phone1,
      age:this.age,
      rolename:this.role
    }
    console.log("registering form ");
    this.user.addUsers(newUser).subscribe((newUser)=> console.log("success"));

  }

  getId(){
    var date = new Date();
    this.id = parseInt(date.getDate()+""+date.getHours()+""+date.getSeconds()+date.getMilliseconds());
    return this.id;
  }

}
