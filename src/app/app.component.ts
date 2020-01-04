import { Component } from '@angular/core';

import { Platform, ToastController, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlarmPage } from './alarm/alarm.page';
import { FcmService } from './Services/fcm.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { HomePage } from './home/home.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public router: Router,
    public navCtrl: NavController
  ) {
    this.sideMenu();

    // check if user is logged in and keep them there else redirect to homepage

    this.afAuth.auth.onAuthStateChanged((user) => {

      // login user if session has not expired or redirect to login if it has
      user ? this.router.navigate(['/home']) : this.router.navigate(['/login']);

    });

  }


  sideMenu() {
    this.navigate = [
      {
        title: 'Home',
        url: '/home',
        icon: 'home'
      },
      {
        title: 'Logs',
        url: '/logs',
        icon: 'alarm'
      }
    ];
  }

  logout() {
    // logout user
    this.afAuth.auth.signOut();

    // navigate to login page

    this.router.navigate(['/login']);
  }

}
