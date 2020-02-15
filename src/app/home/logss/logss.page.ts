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
  userId: any;
  // testAlarm:Observable<any[]>=[]

  constructor(
    private afdb: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.getMyAlarms();
  }

  getMyAlarms() {
    this.userId = this.afAuth.auth.currentUser.uid;

    this.myAlarmDatesData = this.afdb
      .list('UserAlarmLogs/' + this.userId)
.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as {}}))
      )
    );
  }

  onFilterLogs(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event);

  }
}
