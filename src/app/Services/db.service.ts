import { Injectable } from '@angular/core';

import { AlarmLog } from '../models/alarmLog';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  alarmLogList = new BehaviorSubject([]);


  constructor(
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    private plt: Platform
  ) {

    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'alarm.db',
        location: 'default'
      }).then((db: SQLiteObject)=> {
        this.storage = db;
        this.seedDatabase();
      })
    });

  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchAlarms(): Observable<AlarmLog[]> {
    return this.alarmLogList.asObservable();
  }

  seedDatabase() {
    this.httpClient.get('assests/dump.sql', {responseType: 'text'})
    .subscribe( data => {
        this.sqlPorter.importJsonToDb(this.storage, data)
        .then(_ => {
          this.getAlarmLogs();
          this.isDbReady.next(true);
        })
        .catch( err => console.log(err));
      });
  }

  // get list
  getAlarmLogs() {
    return this.storage.executeSql('SELECT * FROM alarmtable', []).then(res => {
      let logs: AlarmLog[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          logs.push({
            id: res.rows.item(i).id,
            userId: res.rows.item(i).userId,
            alarmType: res.rows.item(i).alarmType,
            dateCreated: res.rows.item(i).dateCreated,
          });
        }
      }
      this.alarmLogList.next(logs);
    });
  }

  // add log
  addAlarm(userId, alarmType, dateCreated) {
    let data = [userId, alarmType, dateCreated];
    return this.storage.executeSql('INSERT INTO alarmtable (userId, alarmType,dateCreated) VALUES (?,?,?)', data).then(res => {
      this.getAlarmLogs();
    });

  }

  
}
