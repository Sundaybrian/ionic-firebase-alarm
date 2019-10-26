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
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

// Import ng-circle-progress
import{ NgCircleProgressModule } from 'ng-circle-progress';



@NgModule({
  declarations: [AppComponent,AlarmPage,LoadingSpinnerComponent],
  entryComponents: [AlarmPage],
  imports: [
      BrowserModule, 
      IonicModule.forRoot(), 
      AppRoutingModule,
      AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      NgCircleProgressModule.forRoot({
        //set defaults
        radius:100,
        outerStrokeWidth:16,
        innerStrokeWidth:8,
        outerStrokeColor: "#78C000",
        innerStrokeColor: "#C7E596",
        animationDuration:300,
        animation:false,
        responsive:true,
        renderOnClick:false
      })
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
