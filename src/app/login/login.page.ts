import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';




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
              public loadingctrl:LoadingController
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


}
