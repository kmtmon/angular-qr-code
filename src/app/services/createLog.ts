import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';
@Injectable({ providedIn: 'root' })
export class CreateLog {

  logRec: Log[] = [];
  constructor(private afs: AngularFirestore) { }
  addToLogList(id: string, itemId: string, remark: string, status: string, timestamp: string, userid: string, description: string) {
    let log: Log;
    let timestampInt = + timestamp;
    timestampInt *= 1000;
    let timestampStr = timestampInt + "";

    log = new Log(id, itemId, remark, status, timestampStr, userid, description);
    this.logRec.push(log);
  }
  clearLogList() {
    this.logRec = [];
  }
  reloadLogs() {
    this.clearLogList();
    if (this.logRec.length == 0) {
      let logDoc = this.afs.firestore.collection(`log`);
      logDoc.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.addToLogList(doc.id, doc.get('itemId'), doc.get('remark'), doc.get('status'), doc.get('timestamp'), doc.get('userId'), doc.get('description'));
        })
      })
      console.log("create log: reloaded");
    }
  }
}