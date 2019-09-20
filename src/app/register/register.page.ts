import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { AlertController, Platform ,ToastController} from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { FcmService } from '../Services/fcm.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string=""
  password:string=""
  cpassword:string=""

  constructor(
            public afAuth:AngularFireAuth,
            public alert:AlertController,
            public route:Router,
            public afdb:AngularFireDatabase,
            public fcm:FcmService,
            private platform:Platform,
            public toastcontroller:ToastController
    ) { 
    
    }

  ngOnInit() {
  }


  async register(){
    const{ username,password,cpassword }=this

      if(password !==cpassword){
        this.showAlert("Error","Passwords dont match")
        return console.error("Passwords dont match")
      }


      try {

        const res= await this.afAuth.auth.createUserWithEmailAndPassword(username,password)

        const userAlarmRef=this.afdb.database.ref('UserAlarms')

        const userAlarmData={
          username,
          userId:this.afAuth.auth.currentUser.uid,
          Alarm:0
          
        }

        userAlarmRef.child(userAlarmData.userId).set(userAlarmData)

        this.initializeApp()

        this.showAlert("Succes","Welcome Aboard")
        this.route.navigate(['/login'])
    
      } catch (error) {
        console.dir(error) 
        this.showAlert("Error",error.message)

      } 

  }

  async showAlert(header:string,message:string){
    const alert=await this.alert.create({
      header,
      message,
      buttons:["ok"]
    })

    await alert.present()
  }

    // adding a toast
    private async presentToast(message){
      const toast=await this.toastcontroller.create({
        message,
        duration:3000
  
      })
  
      toast.present();
    }


    initializeApp() {
      this.platform.ready().then(() => {
        // this.statusBar.styleDefault();
        // this.splashScreen.hide();
        this.notificationsSetup()
      });
    }
  
    //notifications setup
    private notificationsSetup(){
      this.fcm.getToken();
      this.fcm.onNotifications().subscribe(
        msg=>{
          if (msg.wasTapped){
            this.presentToast(msg.wasTapped);
          }else{
            this.presentToast(msg.body);
          }
        }
      );
    }


}
