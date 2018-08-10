import { Injectable } from '@angular/core';
import { Log } from '../models/log';

@Injectable({ providedIn: 'root' })
export class CreateLog {
 
  logRec:Log[]=[];
  addToLogList(id: string,itemId: string,remark: string,status: string, timestamp: string , userid: string) {
    let log:Log;
    log = new Log(id,itemId,remark,status,timestamp,userid);
    this.logRec.push(log);
  }
  clearLogList(){
    this.logRec=[];
  }
}