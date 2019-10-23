import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { AlertController, LoadingController ,Platform,ToastController} from '@ionic/angular';
import { FcmService } from '../Services/fcm.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username:string=""
  password:string=""
  showSpinner:boolean=false


  constructor( 
              public afAuth:AngularFireAuth,
              public route:Router,
              public alert:AlertController,
              public loadingctrl:LoadingController,
              private platform:Platform,
              public toastcontroller:ToastController,
              public fcm:FcmService
              ) { }


  ngOnInit() {
  }

  async login(){

    const {username,password }=this
    try {
      const res=await this.afAuth.auth.signInWithEmailAndPassword(username,password)

      const loading = await this.loadingctrl.create({
        message: 'Authenticating...',
        duration: 2000,
        spinner:'bubbles'
      });

       await loading.present();
      const { role, data } = await loading.onDidDismiss();
      
      console.log('Loading dismissed!');
      
      this.initializeApp()

      this.route.navigate(['/home'])
      this.username=""
      this.password=""
      

    } catch (error) {
      console.dir(error)
      this.showAlert("Error",error.message)

      // if(error.code==='auth/user-not-found'){
      //   console.log("User not found")
      // }
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
