import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { CalendarTaskService } from 'src/app/services/calendar-task.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/interfaces/task';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  day: any;
  form: FormGroup;
  openedSidenav: boolean;

  tasks: Task[];

  constructor(
    public dateService: DateService,
    public taskServise: CalendarTaskService
  ) { }

  ngOnInit() {

    this.openedSidenav = false;


    this.dateService.date.pipe(
      switchMap(value => this.taskServise.load(value) )
    ).subscribe(
      res => {
        this.tasks = res;
        console.log(this.tasks);
      }
    );
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      text: new FormControl (''),
      important: new FormControl('')
    });
  } // ngOnInit

  deleteMemo(task: Task){
    this.taskServise.remove(task).subscribe(
      res => { this.tasks = this.tasks.filter(t => t.id !== task.id); },
      err => console.error(err)
    );
  }

  submit(){
    if (this.form.invalid){
      return;
    }
    const task: Task = {
      title: this.form.controls.title.value,
      important: this.importantInfo(String(this.form.controls.important.value)),
      text: this.form.controls.text.value,
      date: this.dateService.date.value.format('DD-MM-YYYY')
    };

    this.taskServise.create(task).subscribe(
      res => {
        this.tasks.push(res);
        this.form.reset();
        console.log('res come ', res);
       },
      error => { console.log(error); }
    );
  }  // submit


  importantInfo(value: string){
    if (value === ''){
      return '3';
    } else {
      return value;
    }

  }


  resetForm(){
    // this.form.reset();

    this.form.markAsUntouched();
    this.form.clearValidators();
    console.log(this.form);
  }

}
