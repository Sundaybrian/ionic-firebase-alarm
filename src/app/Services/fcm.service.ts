import { Injectable } from '@angular/core';

import {Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { FCM } from '@ionic-native/fcm/ngx';
import {  Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})


export class FcmService {

  constructor(
              private fcm:FCM,
              private afdb:AngularFireDatabase,
              private platform:Platform,
              public afAuth:AngularFireAuth
              ) { }

  // get permission from the user
  async getToken(){
    let token;

    if (this.platform.is('android')){
      token=await this.fcm.getToken()
    }

    this.saveToken(token)
  }  
  
  // save token to firebase
  private saveToken(token){
    if(!token) return;

    const devicesRef=this.afdb.database.ref('devices')

    const data={
      token,
      userId:this.afAuth.auth.currentUser.uid

    }

    return devicesRef.child(token).set(data)

  }

  // listen to incoming fcm messages
  onNotifications(){
    return this.fcm.onNotification()
  }
}
