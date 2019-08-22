import { Component } from '@angular/core';
import {NavController } from '@ionic/angular';
import { AlarmPage } from '../alarm/alarm.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  state:Boolean=true;
  stateText:string='ON State';

  constructor(public navctrl:NavController) {}

  toggleState(){

    if(this.state){
      this.stateText='ON State'
      console.log(1,"on")
    }else{
      this.stateText='OFF State'
      console.log(0,"off")
    }
    
    this.state=!this.state
    
  }

  
}
