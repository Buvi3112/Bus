import { Time } from "@angular/common";

export interface Bus {
    [x: string]: any;
    Bus_id: number;
    name:string;
    bus_owner:string;
    total_seats:number;
    available_seats:number;
    ac_nonac:string;
    rating:number;
    departing_time:Time;
    reaching_time:Time;
    available_date:Date;
    fare:number;
    bus_type:string;
    from_location:string;
    to_location:string;
  }
  