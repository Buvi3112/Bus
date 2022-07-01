import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusesComponent } from './bus/buses/buses.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path:'buses/:from/:to/:date', component:BusesComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
