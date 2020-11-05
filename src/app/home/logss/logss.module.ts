import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LogssPage } from './logss.page';
import { TimeOnComponent } from './time-on/time-on.component';
import { KeyRemover } from 'src/app/pipes/keyremover';


const routes: Routes = [
  {
    path: '',
    component: LogssPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LogssPage,
    TimeOnComponent,
    KeyRemover
  ]
})
export class LogssPageModule {}
