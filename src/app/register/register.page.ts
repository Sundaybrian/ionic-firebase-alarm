import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController, Platform , ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { FcmService } from '../Services/fcm.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username = '';
  password = '';
  cpassword = '';

  constructor(
            public afAuth: AngularFireAuth,
            public alert: AlertController,
            public route: Router,
            public afdb: AngularFireDatabase,

    ) {

    }

  ngOnInit() {
  }


  async register() {
    const{ username, password, cpassword } = this;

    if (password !== cpassword) {
        this.showAlert('Error', 'Passwords dont match');
        return console.error('Passwords dont match');
      }


    try {

        const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password);

        const userAlarmRef = this.afdb.database.ref('UserAlarms');

        const userAlarmData = {
          username,
          userId: this.afAuth.auth.currentUser.uid,
          Alarm: 0

        };

        userAlarmRef.child(userAlarmData.userId).set(userAlarmData);

        this.showAlert('Succes', 'Welcome Aboard');
        this.route.navigate(['/login']);

      } catch (error) {
        console.dir(error);
        this.showAlert('Error', error.message);

      }

  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ['ok']
    });

    await alert.present();
  }



}
