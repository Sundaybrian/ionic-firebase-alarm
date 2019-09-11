import { Component } from '@angular/core';
import {NavController, Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import {  Observable } from 'rxjs';
import { FCM } from '@ionic-native/fcm/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  state:Boolean=true;
  stateText:String;
  alarmRef:Observable<any>;
  alarmvalue:Number;
  username:string;

  constructor(public navctrl:NavController,
              private afdb:AngularFireDatabase,
              private fcm:FCM,
              public plt:Platform
    ) {

    this.alarmRef=this.afdb.object('Alarm').valueChanges()
    this.alarmRef.subscribe(x => {
      this.alarmvalue=x
      if(this.alarmvalue==1){
        this.stateText='ON State'
      }else{
        this.stateText='OFF State'
      }
    });


    // code fcm to run  when device is reay
    // this.plt.ready().then(()=>{
    //   this.fcm.onNotification().subscribe(data=>{
    //     if(data.wasTapped){
    //       console.log('Receive in background')
    //     }else{
    //       console.log('Received in foreground')
    //     }

    //   })

    // });

    // this.fcm.onTokenRefresh().subscribe(token=>{
    //   // backend.registerToken()
    // })

    
  }

  toggleState(){

    if(this.alarmvalue==1){
      this.stateText='OFF State'
      this.afdb.object('Alarm').set(0)  
      
    }else{
      this.stateText='ON State'
      this.afdb.object('Alarm').set(1)  
      console.log(0,"off")
    }

  
    
  }

  
}
