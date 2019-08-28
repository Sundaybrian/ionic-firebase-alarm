import { Component } from '@angular/core';

import { Platform, ToastController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlarmPage } from './alarm/alarm.page';
import { FcmService } from './Services/fcm.service';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm:FcmService,
    public toastcontroller:ToastController
  ) {
    this.initializeApp();
  }

  // adding a toast
  private async presentToast(message){
    const toast=await this.toastcontroller.create({
      message,
      duration:3000

    })

    toast.present();
  }

  //notifications setup
  private notificationsSetup(){
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      msg=>{
        if (this.platform.is('android')){
          this.presentToast(msg.wasTapped);
        }else{
          this.presentToast(msg.body);
        }
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
