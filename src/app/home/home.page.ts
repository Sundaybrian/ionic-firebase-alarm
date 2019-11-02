import { Component } from '@angular/core';
import {NavController, Platform, AlertController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import {  Observable } from 'rxjs';
import { FCM } from '@ionic-native/fcm/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  state = true;
  showTemporary = false;
  stateText: string;
  alarmRef: Observable<any>;
  alarmLogRef: any;
  alarmvalue: number;
  userID: any;

  devicesRef: any;

  // circle progress
  percent = 0;
  progress: any = 0;
  radius = 100;
  fullTime = '00:03:30';
  timer: any = false;

  minutes: any = 3;
  seconds: any = 30;

  elapsed: any = {
    h: '00',
    m: '00',
    s: '00'
  };

  countDownTimer: any = false;
  timeLeft: any = {
    h: '00',
    m: '00',
    s: '00'
  };
  remainingTime = `${this.timeLeft.m}:${this.timeLeft.s}`;

  constructor(
    public navctrl: NavController,
    private afdb: AngularFireDatabase,
    private fcm: FCM,
    public plt: Platform,
    public afAuth: AngularFireAuth,
    public route: Router,
    private alertCtrl: AlertController
  ) {

      this.getAlarm();

  }

  startTime() {
    console.log('clicked svg');

    if (this.timer) {
      clearInterval(this.timer);
      clearInterval(this.countDownTimer);
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    const timeSplit = this.fullTime.split(':');
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    const totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);
    let secondsLeft = totalSeconds;

    this.countDownTimer = setInterval(() => {
      if (secondsLeft >= 0) {
        this.timeLeft.m = Math.floor(secondsLeft / 60);
        this.timeLeft.s = secondsLeft - (60 * this.timeLeft.m);
        this.remainingTime = `${this.pad(this.timeLeft.m, 2)}:${this.pad(this.timeLeft.s, 2)}`;
        secondsLeft--;
      }
    }, 1000);

    this.timer = setInterval(() => {
      if (this.percent == this.radius) {
        clearInterval(this.timer);
      }

      this.percent = Math.floor((this.progress / totalSeconds) * 100);

      console.log('here');
      this.progress++;
    }, 1000);

  }


  pad(num, size) {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

  stopTime() {
    clearInterval(this.timer);
    clearInterval(this.countDownTimer);
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      h: '00',
      m: '00',
      s: '00'
    };
    this.timeLeft = {
      h: '00',
      m: '00',
      s: '00'
    };
    this.remainingTime = `${this.timeLeft.m}:${this.timeLeft.s}`;
    
    // once timer is stopped automagically turn on the alarm
    this.afdb.object('UserAlarms/' + this.userID + '/Alarm').set(1);
    this.pushAlarm();
    this.state = true;
    this.showTemporary = false;
  }

  toggleState() {

    if (this.alarmvalue == 1) {
      this.stateText = 'Turn Off';
      // need to inject a modal or action sheet for the user to actually decide to turn off or temporary disable the alarm
      this.alertCtrl.create({
        header: 'Choose an an action',
        message: 'Turn of temporarily or turn off completely?',
        buttons: [
          {
            text: 'Turn Off',
            role: 'cancel'
          },
          {
            text: 'Turn Off Temporarily',
            handler: () => {
              console.log('temporary clicked');
              this.showTemporary = true;
            }
          }
        ]
      }).then( alertEl => {
        alertEl.present();
      });

      this.afdb.object('UserAlarms/' + this.userID + '/Alarm').set(0);
      this.state = false;
      this.showTemporary = false;

    } else {
      this.stateText = 'Turn On';
      this.afdb.object('UserAlarms/' + this.userID + '/Alarm').set(1);
      this.pushAlarm();
      this.state = true;

    }

  }


  getAlarm() {
    this.userID = this.afAuth.auth.currentUser.uid;

    this.alarmRef = this.afdb.object('UserAlarms/' + this.userID + '/Alarm').valueChanges();

    this.alarmRef.subscribe(x => {
      this.alarmvalue = x;
      if (this.alarmvalue == 1) {
        this.stateText = 'Turn Off';
        this.state = true;
      } else {
        this.stateText = 'Turn On';
        this.state = false;
      }
    });

  }

  pushAlarm() {
    const d = new Date();
    const today = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    const user = this.afAuth.auth.currentUser.uid;

    this.afdb.database.ref('UserAlarmLogs/' + user).child(today).push(time);

    console.log('pushed alarm  1', today, time);
  }


}
