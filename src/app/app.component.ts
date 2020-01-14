import { Component, OnInit } from '@angular/core';

import { Platform, ToastController, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';



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
    public loadingCtrl: LoadingController
  ) {
    // login user to the app after app has left background
    this.resumeSession();

  }

  ngOnInit() {
    // fetch user
    this.currentUser = this.afAuth.auth.currentUser.email;
    console.log(this.currentUser);
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
