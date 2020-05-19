import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-organaizer-date',
  templateUrl: './organaizer-date.component.html',
  styleUrls: ['./organaizer-date.component.scss']
})
export class OrganaizerDateComponent implements OnInit {

  constructor(
    public dateService: DateService
  ) { }

  ngOnInit() {
  }

  go(move: number){
    this.dateService.changeMonth(move);
  }

}
