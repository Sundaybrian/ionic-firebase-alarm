import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username:string=""
  password:string=""


  constructor( public afAuth:AngularFireAuth,public route:Router,public alert:AlertController) { }

  ngOnInit() {
  }

  async login(){
    const {username,password }=this
    try {
      const res=await this.afAuth.auth.signInWithEmailAndPassword(username,password)

      this.route.navigate(['/home'])
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
