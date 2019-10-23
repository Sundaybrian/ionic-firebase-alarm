import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()

exports.newAlarmNotification=functions.database.ref('UserAlarms/{userId}').onWrite( async event=>{

    const data=event.after.val()

    //grab alarm value
    const alarmValue=data.Alarm

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


    return admin.messaging().sendToDevice(token,payload)
})


