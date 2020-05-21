import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { Week } from '../../shared/interfaces/week';
import * as moment from 'moment';
import { Day } from '../../shared/interfaces/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Week[];

  days: Day[];

  selectingDay: any;
  date: any;

  constructor(
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.dateService.date.subscribe( this.generate.bind(this) );

  }


  generate(now: moment.Moment){
    console.log(now.format('YYYY MM DD'));

    const day = this.dateService.getDay();

    console.log('Day: ' , day.format('YYYY MM DD'));

    const startDay = now.clone().startOf('months').startOf('week');
    const date = startDay.clone();
    const isNow = moment();

    const calendar = [];

    /*
    **   @ while ( date.isBefore(endDay, 'day') ) @
    **   need to have 6 weeks
    */
    while ( calendar.length !== 42 ){
      calendar.push({
        value: date.clone(),
        now: this.isNow(date.clone() ),
        selected: this.isSelected(day.clone(), date.clone()),
        disabled: this.isDisabled(now.clone(), date.clone())
      });
      date.add(1, 'day');
    }
    console.log(calendar);

    this.days = calendar;

  }

  isNow(date: moment.Moment){
    return date.isSame(moment() , 'date');
  }

  isSelected(selectDay: moment.Moment , date: moment.Moment): boolean{
    return selectDay.isSame(date, 'day');
  }

  isDisabled(now: moment.Moment, date: moment.Moment): boolean{
    return !now.startOf('month').isSame(date, 'month');
  }


  selectDay(day: Day){

    console.log(day);

    this.days.forEach( ( day: Day) => {
      day.selected = false;
    });
    day.selected = true;

    console.log('Day value : ', day);

    this.dateService.setDay(day.value.clone());
    this.dateService.changeDate(day.value);

  }

  go(move: number){
    this.dateService.changeMonth(move);
  }

}
