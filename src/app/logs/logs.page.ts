import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  myAlarms:any[]=[]
  myAlarmDates:any[]=[]
  userId:any;
  userAlarmRef;
  // testAlarm:Observable<any[]>=[]

  constructor(private afdb:AngularFireDatabase,
              public afAuth:AngularFireAuth          
    ) { 
      this.getMyAlarms()
    }

  ngOnInit() {
  }

  getMyAlarms(){

    this.userId=this.afAuth.auth.currentUser.uid

    this.userAlarmRef=this.afdb.object('UserAlarmLogs/'+this.userId).valueChanges()

    // this.userAlarmRef.on('value',function(snap){
    //   // snap.val() is an object with multiple objects
    //   console.log(snap.val(),"snap.val")

    //   // so we loop each object
    //   snap.forEach(childSnap => {
    //     //grabbing each obj in snap
    //     var val=childSnap.val()

    //     console.log(val,'children')

    //     // pushing each alarm date obj to myalarms array
    //     localAlarms.push(childSnap.val())
    //     console.log(localAlarms,"localalarams")

    //   });

    // })

    this.userAlarmRef.subscribe(dates => {
      for (const key in dates) {
        if (dates.hasOwnProperty(key)) {
          // const element = object[key];
         
          console.log(dates[key],"geniussssssssssss");
          this.myAlarmDates.push(key)
          this.myAlarms.push(dates[key])
          
        }
      }
    
    });
    



  }

}
