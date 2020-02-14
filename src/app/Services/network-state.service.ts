import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStateService {
  connectSubscription$: Subscription = null;
  disconnectSubscription$: Subscription = null;
  networkStatus: boolean;

  constructor(
    
    public toastcontroller: ToastController
  ) {
   
  }

  // adding a toast
  public async presentToast(message) {
    const toast = await this.toastcontroller.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}
