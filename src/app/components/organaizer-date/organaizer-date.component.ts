import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import * as moment from 'moment';

@Component({
  selector: 'app-organaizer-date',
  templateUrl: './organaizer-date.component.html',
  styleUrls: ['./organaizer-date.component.scss']
})
export class OrganaizerDateComponent implements OnInit {

  mounthBeforeNow: moment.Moment;
  mounthAfterNow: moment.Moment;

  constructor(
    public dateService: DateService
  ) { }

  ngOnInit() {
    this.dateService.date.subscribe(this.createMounth.bind(this));
  }

  go(move: number){
    this.dateService.changeMonth(move);
  }

  createMounth(now: moment.Moment){
    this.mounthBeforeNow = now.clone().subtract(1, 'month');
    this.mounthAfterNow = now.clone().add(1, 'month');
  }

  showThisMonth(){
    const nowDate = moment().locale('ru');
    this.dateService.setDay(nowDate.clone());
    this.dateService.changeDate(nowDate.clone());
  }

}
