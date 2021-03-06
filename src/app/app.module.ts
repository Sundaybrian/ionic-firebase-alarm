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
import { Network } from '@ionic-native/network/ngx';

// importing fcm
import { FCM } from '@ionic-native/fcm/ngx';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { NetworkStateService } from './Services/network-state.service';

import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClientModule } from '@angular/common/http';
import { DbService } from './Services/db.service';


@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
  ],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FCM,
    Network,
    NetworkStateService,
    SQLite,
    SQLitePorter,
    DbService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
