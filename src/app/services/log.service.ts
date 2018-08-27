import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Item } from '../models/item';
import { MessageService } from './message.service';
import {Log} from '../models/log';
import {CreateLog } from './createLog';

@Injectable({ providedIn: 'root' })
export class LogService   {
    LOGLIST=this.createLog.logRec;
    constructor( 
        private messageService: MessageService,
        private createLog:CreateLog
    ) { }
  
   
 
}