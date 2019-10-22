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

  myalarms=[]
  userId:any;
  userAlarmRef;


  constructor(private afdb:AngularFireDatabase,
              public afAuth:AngularFireAuth          
    ) { 
      this.getMyAlarms()
    }

  ngOnInit() {
  }

  getMyAlarms(){
    this.userId=this.afAuth.auth.currentUser.uid
    this.userAlarmRef=this.afdb.database.ref('UserAlarmLogs/'+this.userId)

    this.userAlarmRef.on('value',function(snap){
      // snap.val() is an object with multiple objects
      console.log(snap.val())

      // so we loop each object
      snap.forEach(childSnap => {
        //grabbing each obj in snap
        var val=childSnap.val()

        console.log(val,'childsnap')

        // pushing each alarm date obj to myalarms array
        this.myalarms.push(val)

      });

    })

  }

}
