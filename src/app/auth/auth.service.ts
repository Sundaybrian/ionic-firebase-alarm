import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FcmService } from '../Services/fcm.service';
import { AlertController, LoadingController, ToastController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public fcm: FcmService,
    public alert: AlertController,
    private platform: Platform,
    public loadingctrl: LoadingController,
    public toastcontroller: ToastController,
    public afdb: AngularFireDatabase,
  ) { }


  async login(email, password) {
    // method to login a user

    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      const loading = await this.loadingctrl.create({
        message: 'Authenticating...',
        duration: 2000,
        spinner: 'bubbles'
      });

      await loading.present();
      const { role, data } = await loading.onDidDismiss();

      // call initialize app to setup the notification
      this.initializeApp();

      // navigate user to home page
      this.router.navigate(['/home']);

    } catch (error) {
      // show errors
      this.showAlert('Error', error.message);

    }
  }

  // async register() {

  //   // to register a user

  //   const{ username, password, cpassword } = this;

  //   if (password !== cpassword) {
  //       this.showAlert('Error', 'Passwords dont match');
  //       return console.error('Passwords dont match');
  //     }


  //   try {

  //       const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);

  //       const userAlarmRef = this.afdb.database.ref('UserAlarms');

  //       const userAlarmData = {
  //         username,
  //         userId: this.afAuth.auth.currentUser.uid,
  //         Alarm: 0,
  //         temporaryState: 0

  //       };

  //       userAlarmRef.child(userAlarmData.userId).set(userAlarmData);

  //       this.showAlert('Succes', 'Welcome Aboard');
  //       this.router.navigate(['/home']);

  //     } catch (error) {
  //       console.dir(error);
  //       this.showAlert('Error', error.message);

  //     }

  // }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['ok']
    });

    await alert.present();
  }

  // adding a toast
  private async presentToast(message) {
    const toast = await this.toastcontroller.create({
      message,
      duration: 3000

    });
    toast.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
      this.notificationsSetup();
    });
  }

  // notifications setup
  private notificationsSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(msg => {
      if (msg.wasTapped) {
        this.presentToast(msg.wasTapped);
      } else {
        this.presentToast(msg.body);
      }
    });
  }

}
