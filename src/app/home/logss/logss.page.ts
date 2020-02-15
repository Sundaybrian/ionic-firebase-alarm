import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SegmentChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-logss',
  templateUrl: './logss.page.html',
  styleUrls: ['./logss.page.scss']
})
export class LogssPage implements OnInit {
  myAlarmsObjs: any[] = [];
  myAlarmDatesData: Observable<any[]>;
  myAlarmSwapData: any;
  myTempoDatesData: Observable<any[]>;
  myTempoSwapData: any;
  userId: any;
  // testAlarm:Observable<any[]>=[]

  constructor(
    private afdb: AngularFireDatabase,
    public afAuth: AngularFireAuth
    ) {
      this.userId = this.afAuth.auth.currentUser.uid;

    }

  ngOnInit() {
    this.getMyAlarms();
    this.getMyTempo();
  }

  getMyAlarms() {

    // fetch time on logs
   this.myAlarmSwapData = this.myAlarmDatesData = this.afdb
      .list('UserAlarmLogs/' + this.userId)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }))
        )
      );
  }

  getMyTempo() {
    // fetch temporary logs
    this.myTempoSwapData = this.myAlarmDatesData = this.afdb
      .list('UserTemporaryLogs/' + this.userId)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...(c.payload.val() as {}) }))
        )
      );
  }

  onFilterLogs(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'on') {
      // render the time on logs
      this.myAlarmDatesData = this.myAlarmSwapData;
    } else {
      // render the temporary off logs
      this.myAlarmDatesData = this.myTempoSwapData;
    }
  }
}
