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

  // circle progress
  percent:number=50;
  progress:any=0;
  radius:number=100;
  fullTime='00:03:30';
  timer:any=false;
  
  minutes:number=3;
  seconds:any=30;

  elapsed:any={
    'h':"00",
    'm':"00",
    's':"00"
  };

  overalTimer:any=false;

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

  startTime(){
    console.info("clicked svg")

    if(this.timer){
      clearInterval(this.timer);
    }

    // if(!this.overalTimer){
    //   // if overall timer is set to false run it
    //   this.progressTimer();
    // }

    this.timer=false;
    this.percent=0;
    this.progress=0;

    let timeSplit=this.fullTime.split(':');
    this.minutes=timeSplit[1];
    this.seconds=timeSplit[2];

    let totalSeconds=Math.floor(this.minutes * 60) + parseInt(this.seconds);
    
    this.timer=setInterval(()=>{
      if(this.percent == this.radius){
        clearInterval(this.timer);
      }
      
      this.percent=Math.floor((this.progress/totalSeconds)*100);
        
      console.log("here");
      this.progress++;
    }, 1000)
    
  }

  progressTimer(){
    let countDownDate=new Date();

    this.overalTimer=setInterval(function(){
      let now=new Date().getTime();
      let distance=now - countDownDate.getTime();

      // this.elapsed.h=Math.floor((distance % (1000 * 60 * 60 *24)) / (1000 * 3600));
      // this.elapsed.m=Math.floor(( distance % (1000 * 60 * 60)) / (1000 * 60));
      // this.elapsed.s=Math.floor(( distance % (1000 *60 )) / 1000);

      // this.elapsed.h=this.pad(this.elapsed.h,2);
      // this.elapsed.m=this.pad(this.elapsed.m,2);
      // this.elapsed.s=this.pad(this.elapsed.s,2);

 
    })
  }

  pad(num,size){
    let s=num + "";
    while(s.length <size) s= "0" +s;
    return s;
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
