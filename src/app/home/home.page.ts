import { Component } from '@angular/core';
import {NavController, Platform } from '@ionic/angular';
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

  state:Boolean=true;
  stateText:String;
  alarmRef:Observable<any>;
  alarmLogRef:any;
  alarmvalue:Number;
  userID:any;

  devicesRef:any;
 

  constructor(

              public navctrl:NavController,
              private afdb:AngularFireDatabase,
              private fcm:FCM,
              public plt:Platform,
              public afAuth:AngularFireAuth,
              public route:Router
    ) {

      this.getAlarm()

  }

  toggleState(){

    if(this.alarmvalue==1){
      this.stateText='OFF State' 
      this.afdb.object('UserAlarms/'+this.userID+'/Alarm').set(0)
      
    }else{
      this.stateText='ON State' 
      this.afdb.object('UserAlarms/'+this.userID+'/Alarm').set(1)
      this.pushAlarm()
      
    }
    
  }


  getAlarm(){

    this.userID=this.afAuth.auth.currentUser.uid  
    
    this.alarmRef=this.afdb.object('UserAlarms/'+this.userID+'/Alarm').valueChanges()

    this.alarmRef.subscribe(x => {
      this.alarmvalue=x
      if(this.alarmvalue==1){
        this.stateText='ON State'
      }else{
        this.stateText='OFF State'
      }
    });

  }

  pushAlarm(){
    var d=new Date()
    var today=d.getDate()+'-'+(d.getMonth()+1)+'-'+d.getFullYear()
    var time=d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
    var user=this.afAuth.auth.currentUser.uid

    this.afdb.database.ref('UserAlarmLogs/'+user).child(today).push(time)
    
    console.log('pushed alarm  1',today,time)
  }

  
}
