import { Injectable } from '@angular/core';

import {Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { FCM } from '@ionic-native/fcm/ngx';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class FcmService {

  constructor(private fcm:FCM,
              private afdb:AngularFireDatabase,
              private platform:Platform) { }

  async getToken(){
    let token;

    if (this.platform.is('android')){
      token=await this.fcm.getToken()
    }

    this.saveToken(token)
  }  
  
  private saveToken(token){
    if(!token) return;

    const devicesRef=this.afdb.database.ref('devices')

    const data={
      token,
      userId:'testUserId'
    }

  }

  onNotifications(){
    return this.fcm.onNotification()
  }
}
