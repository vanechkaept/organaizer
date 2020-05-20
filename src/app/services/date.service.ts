import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

export class DateService {
  public date: BehaviorSubject<moment.Moment> = new BehaviorSubject(moment().locale('ru'));

  day = moment();

  changeMonth(move: number){
    const value = this.date.value.add(move, 'month');
    this.date.next(value);
  }

  changeDate(date: moment.Moment){
    this.date.next(date);
  }

  setDay(day: moment.Moment){
    this.day = day;
  }

  getDay(){
    return this.day;
  }

}
