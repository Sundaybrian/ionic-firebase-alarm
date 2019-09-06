import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AlarmPage } from './alarm/alarm.page';

// importing fcm
import { FCM } from '@ionic-native/fcm/ngx';


@NgModule({
  declarations: [AppComponent,AlarmPage],
  entryComponents: [AlarmPage],
  imports: [
      BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule,
      AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
      AngularFireDatabaseModule,
      AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
