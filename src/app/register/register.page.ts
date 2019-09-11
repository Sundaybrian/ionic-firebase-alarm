import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username:string=""
  password:string=""
  cpassword:string=""

  constructor(public afAuth:AngularFireAuth,public alert:AlertController,public route:Router) { }

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
}
