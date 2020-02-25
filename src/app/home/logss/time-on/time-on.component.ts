import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'time-on',
  templateUrl: './time-on.component.html',
  styleUrls: ['./time-on.component.scss'],
})
export class TimeOnComponent {

  @Input('alarm') alarm = {};
  timeOnLogs = {};

  constructor() {
    // removing the key propertie from the alarm object which contains
    // the actuall date that houses the logs
    this.timeOnLogs = this.alarm;
    console.log(this.timeOnLogs);
  }


}
