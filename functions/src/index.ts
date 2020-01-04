import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

exports.newAlarmNotification=functions.database.ref('UserAlarms/{userId}').onWrite( async event=>{

    const data=event.after.val()

    //grab alarm value
    const alarmValue=data.Alarm

    //grab temporary state
    const temporaryState=data.temporaryState

    //grab user id
    const userId=data.userId

    //Notification content
    const payload={
        notification:{
            title:'Alarm State Changed',
            body:`Alarm is now ${alarmValue}`,

        }
    }

    //ref to the device for the user
    const db=admin.database()
    let token:string='';

    db.ref(`devices/${userId}`).on('value',function(snap){

        if(snap != null) {
            token=snap.val()['token']
        }


      })

      if (temporaryState == 1) {

        //if temporary state is on dont send notification
          return false
          
      } else {
          //create alarm log
       
        // to be a cloud function
        const d = new Date();
        const today = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
        const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  
        // create alarm log
        db.ref('UserAlarmLogs/' + userId).child(today).push(time);
    
        //then send notification
          return admin.messaging().sendToDevice(token,payload)
      }


})

