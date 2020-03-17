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
  alarmLogList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {

  }

  create() {
    this.sqlite.create({
      name: 'alarm.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.storage = db;
      this.getData();
    });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  getData() {
    this.httpClient.get(
      'assests/dump.sql',
      {responseType: 'text'}
      ).subscribe( data => {
        this.sqlPorter.importJsonToDb(this.storage, data).then(_ => {
          this.getAlarmLogs();
          this.isDbReady.next(true);
        }).catch( err => console.log(err));
      });
  }

  getAlarmLogs() {
    return this.storage.executeSql('SELECT * FROM alarmtable', []).then(res => {
      let items: AlarmLog[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id: res.rows.item(i).alarm_id,
            userId: res.rows.item(i).user_id,
            alarmId: res.rows.item(i).alarm_fbase_id,
            alarmType: res.rows.item(i).alarm_type,
            dateCreated: res.rows.item(i).date_created,
          });
        }
      }
      this.alarmLogList.next(items);
    });
  }

  addAlarm(obj) {
    let data = [obj.user_id, obj.alarm_fbase_id, obj.alarm_type, obj.date_created];
    return this.storage.executeSql('INSERT INTO alarmtable (user_id, alarm_fbase_id, alarm_type, date_created) VALUES (?,?,?,?)', data).then( _res => {
      this.getAlarmLogs();
    });

  }
}
