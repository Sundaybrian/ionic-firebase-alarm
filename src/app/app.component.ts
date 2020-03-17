import { Component, OnInit } from '@angular/core';

import { Platform, ToastController, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FcmService } from './Services/fcm.service';
import { AuthService } from './auth/auth.service';
import { DbService } from './Services/db.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  navigate: any;
  currentUser: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth: AngularFireAuth,
    public router: Router,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public fcm: FcmService,
    public authService: AuthService,
    public db: DbService

  ) {
    this.initializeApp();
    // login user to the app after app has left background
    this.resumeSession();
    

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      // check networl state
      this.notificationsSetup();
      this.db.create();
    });
  }

  // notifications setup
  private notificationsSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(msg => {
      if (msg.wasTapped) {
        this.authService.presentToast(msg.wasTapped);
      } else {
        this.authService.presentToast(msg.body);
      }
    });
  }

  ngOnInit() {
    // fetch current authenticated user
    this.currentUser = this.afAuth.auth.currentUser.email;
  
  }

  async resumeSession() {
    // check if user is logged in and keep them there else redirect to homepage

    const loading = await this.loadingCtrl.create({
      message: 'Resuming session...',
      duration: 2000,
      spinner: 'bubbles'
    });

    await loading.present();
    const { role, data } = await loading.onDidDismiss();

    this.afAuth.auth.onAuthStateChanged((user) => {

      // login user if session has not expired or redirect to login if it has
      user ? this.router.navigate(['/home']) : this.router.navigate(['/auth']);

    });


  }

  onLogout() {
    // logout user
    this.afAuth.auth.signOut();

    // navigate to login page
    this.router.navigate(['/login']);
  }

}
