import { Component } from '@angular/core';
import {NavController } from '@ionic/angular';
import { alarmRefPage } from '../alarmRef/alarmRef.page';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state:Boolean=true;
  stateText:String='ON State';
  alarmRef:Observable<any>;
  alarmvalue:Number;

  constructor(public navctrl:NavController,private afdb:AngularFireDatabase) {

    this.alarmRef=this.afdb.object('Alarm').valueChanges()
    this.alarmRef.subscribe(x => this.alarmvalue=x);
    
  }

  toggleState(){

    if(this.state){
      this.stateText='ON State'
      this.alarmvalue=1  
      
    }else{
      this.stateText='OFF State'
      this.alarmvalue=0
      console.log(0,"off")
    }

    this.state=!this.state
    
  }

  
}
