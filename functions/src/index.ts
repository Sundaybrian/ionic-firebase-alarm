import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp()

exports.newAlarmNotification=functions.database.ref('Alarm').onWrite( async event=>{

    // fetch value of the alarm
    const data=event.after.val()

    const utoken="fZqNjI3Z0Xc:APA91bFEOv8oerrggTevqR3u5BeUKNS_TI3PQTEtx9DaX7f2lMPj_6QbHOfedsLUmYtkzJM9hXKnqaSKy63mDft52ce87h3or5GeCv0vYH4u36YMYJ8Z6M-yMTPIDx3pLN4QTKdFzFnI"

    //ref to the device tree for the user
    const db=admin.database()
    const devicesRef=db.ref('devices').equalTo('testUserId','testUserId')

    //fetch users tokens and send notifications
    // const devices= await devicesRef.

    //Notification content
    const payload={
        notification:{
            title:'Alarm State Changed',
            body:`Alarm is now ${data}`
        }
    }


    return admin.messaging().sendToDevice(utoken,payload)
})


