import { Component, OnInit, NgZone } from "@angular/core";
import { NavController, Platform, AlertController } from "@ionic/angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable, Subscription } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from "@angular/router";
import { NetworkStateService } from "src/app/Services/network-state.service";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-alarm",
  templateUrl: "./alarm.page.html",
  styleUrls: ["./alarm.page.scss"]
})
export class AlarmPage implements OnInit {
  state = true;
  showTemporary = false;
  stateText: string;
  alarmRef: Observable<any>;
  alarmLogRef: any;
  alarmvalue: number;
  userID: any;
  networkStatus: any;
  connectSubscription$: Subscription = null;
  disconnectSubscription$: Subscription = null;

  devicesRef: any;

  // circle progress
  percent = 0;
  progress: any = 0;
  radius = 100;
  fullTime = "00:03:30";
  timer: any = false;

  minutes: any = 3;
  seconds: any = 30;

  elapsed: any = {
    h: "00",
    m: "00",
    s: "00"
  };

  countDownTimer: any = false;
  timeLeft: any = {
    h: "00",
    m: "00",
    s: "00"
  };
  remainingTime = `${this.timeLeft.m}:${this.timeLeft.s}`;

  constructor(
    public navctrl: NavController,
    private afdb: AngularFireDatabase,
    public plt: Platform,
    public afAuth: AngularFireAuth,
    public route: Router,
    private alertCtrl: AlertController,
    private networkService: NetworkStateService,
    private network: Network,
    ngZone: NgZone
  ) {
    // check internet connection
    // watch network for a disconnection
    this.disconnectSubscription$ = this.network.onDisconnect().subscribe(() => {
      ngZone.run(() => {
        this.networkStatus = false;
      });

      this.networkService.presentToast(`You're offline! 😢 `);
    });

    // watch network for a connection
    this.connectSubscription$ = this.network.onConnect().subscribe(() => {
      this.networkService.presentToast(`You're online! 😄 `);
      ngZone.run(() => {
        setTimeout(() => {
          if (this.network.type !== "none") {
            this.networkService.presentToast(
              `You got! 😄 ${this.network.type}`
            );
            this.networkStatus = true;
            this.getAlarm();
          }
        }, 1500);
      });
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
    });
  }

  ngOnInit() {
  }

  startTime() {
    console.log("start temporary time");

    // toogle the temporary state to 1 in the db
    this.afdb.object("UserAlarms/" + this.userID + "/temporaryState").set(1);

    if (this.timer) {
      clearInterval(this.timer);
      clearInterval(this.countDownTimer);
    }

    this.timer = false;
    this.percent = 0;
    this.progress = 0;

    const timeSplit = this.fullTime.split(":");
    this.minutes = timeSplit[1];
    this.seconds = timeSplit[2];

    // tslint:disable-next-line: radix
    const totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);
    let secondsLeft = totalSeconds;

    this.countDownTimer = setInterval(() => {
      if (secondsLeft >= 0) {
        this.timeLeft.m = Math.floor(secondsLeft / 60);
        this.timeLeft.s = secondsLeft - 60 * this.timeLeft.m;
        this.remainingTime = `${this.pad(this.timeLeft.m, 2)}:${this.pad(
          this.timeLeft.s,
          2
        )}`;
        secondsLeft--;

        // tslint:disable-next-line: triple-equals
        if (secondsLeft == 0) {
          // check if the timer has ended
          // this.afdb.object('UserAlarms/' + this.userID + '/Alarm').set(0);

          // toogle the temporary state to 0 in the db once timer ends
          this.afdb
            .object("UserAlarms/" + this.userID + "/temporaryState")
            .set(0);

          this.state = true;
          // return to button page
          this.showTemporary = false;
        }
      }
    }, 1000);

    this.timer = setInterval(() => {
      // tslint:disable-next-line: triple-equals
      if (this.percent == this.radius) {
        clearInterval(this.timer);
      }

      this.percent = Math.floor((this.progress / totalSeconds) * 100);

      console.log("here");
      this.progress++;
    }, 1000);
  }

  pad(num, size) {
    let s = num + "";
    while (s.length < size) {
      s = "0" + s;
    }
    return s;
  }

  stopTime() {
    // stop the timer
    clearInterval(this.timer);
    clearInterval(this.countDownTimer);
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.elapsed = {
      h: "00",
      m: "00",
      s: "00"
    };
    this.timeLeft = {
      h: "00",
      m: "00",
      s: "00"
    };
    this.remainingTime = `${this.timeLeft.m}:${this.timeLeft.s}`;

    // once timer is stopped automagically turn on the alarm
    // this.afdb.object('UserAlarms/' + this.userID + '/Alarm').set(0);

    // toogle the temporary state to 0 in the db once timer ends
    this.afdb.object("UserAlarms/" + this.userID + "/temporaryState").set(0);

    // toggle states
    this.state = true;
    this.showTemporary = false;
  }

  toggleState() {
    // tslint:disable-next-line: triple-equals
    if (this.alarmvalue == 1) {
      this.stateText = "Turn Off";
      // need to inject a modal or action sheet for the user to actually decide to turn off or temporary disable the alarm
      this.alertCtrl
        .create({
          header: "Choose an action",
          message: "Turn off temporarily or turn off completely?",
          buttons: [
            {
              text: "Turn Off",
              role: "cancel"
            },
            {
              text: "Turn Off Temporarily",
              handler: () => {
                // call temporary off
                this.temporaryOff();
              }
            }
          ]
        })
        .then(alertEl => {
          alertEl.present();
        });

      this.afdb.object("UserAlarms/" + this.userID + "/Alarm").set(0);
      this.state = false;
      this.showTemporary = false;
    } else {
      this.stateText = "Turn On";
      this.afdb.object("UserAlarms/" + this.userID + "/Alarm").set(1);

      // toogle the temporary state to 0 in the db
      this.afdb.object("UserAlarms/" + this.userID + "/temporaryState").set(0);
      this.state = true;
    }
  }

  getAlarm() {
    // get current logged in user ID
    this.userID = this.afAuth.auth.currentUser.uid;

    // grab the current logged in user alarm reference
    this.alarmRef = this.afdb
      .object("UserAlarms/" + this.userID + "/Alarm")
      .valueChanges();

    // subcribe to the alarm ref obervable for the value changes
    this.alarmRef.subscribe(x => {
      this.alarmvalue = x;
      // tslint:disable-next-line: triple-equals
      if (this.alarmvalue == 1) {
        this.stateText = "Turn Off";
        this.state = true;
      } else {
        this.stateText = "Turn On";
        this.state = false;
      }
    });
  }

  temporaryOff() {
    console.log("temporary clicked");
    this.showTemporary = true;

    // // toogle the temporary state to 1 in the db
    // this.afdb.object('UserAlarms/' + this.userID + '/temporaryState').set(1);
  }
}
