import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-logss',
  templateUrl: './logss.page.html',
  styleUrls: ['./logss.page.scss'],
})
export class LogssPage implements OnInit {

  myAlarms: any[] = [];
  myAlarmDates: any[] = [];
  userId: any;
  userAlarmRef;
  // testAlarm:Observable<any[]>=[]

  constructor(
    private afdb: AngularFireDatabase,
    public afAuth: AngularFireAuth
    ) {

      this.getMyAlarms();
    }

  ngOnInit() {
  }

  getMyAlarms() {

    this.userId = this.afAuth.auth.currentUser.uid;

    this.userAlarmRef = this.afdb.object('UserAlarmLogs/'+this.userId).valueChanges();

    this.userAlarmRef.subscribe(dates => {
      for (const key in dates) {
        if (dates.hasOwnProperty(key)) {
          // const element = object[key];
          console.log(dates[key], 'geniussssssssssss');
          // push the dates
          this.myAlarmDates.push(key);

          //
          this.myAlarms.push(dates[key]);
        }
      }
    });

  }

}
