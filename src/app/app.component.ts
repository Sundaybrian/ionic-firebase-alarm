import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlarmPage } from './alarm/alarm.page';
import { FcmService } from './Services/fcm.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navigate:any

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public afAuth:AngularFireAuth,
    public router:Router
  ) {
    this.sideMenu()
  }


  sideMenu(){
    this.navigate=[
      {
        title:"Home",
        url:'/home',
        icon:'home'
      },
      {
        title:'Logs',
        url:'/logs',
        icon:'alarm'
      }
      // ,
      // {
      //   title:'Logout',
      //   url:'/logout',
      //   icon:'log-out'
      // }
    ]
  }

  logout(){
    this.afAuth.auth.signOut()
    this.router.navigate(['/login'])
  }

}
