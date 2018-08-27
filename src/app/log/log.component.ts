import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Item } from '../models/item';
import {Log } from '../models/log';
import {LogService} from '../services/log.service';
import {CreateLog} from '../services/createLog';
import {CategoryService} from '../services/category.service';
import {CreateItems} from '../services/createItems';
import * as jsPDF from 'jspdf'
import { DatePipe } from '@angular/common';
import {CreateUsers } from '../services/createUsers';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
  providers:[
    DatePipe
  ]
})
export class LogComponent implements OnInit {
  @Input() itemId: string;
  logs:Log[]=[];
  catName:string;
  constructor(
    private route: ActivatedRoute,
    private logService: LogService,
    private location: Location,
    private createLog:CreateLog,
    private catService:CategoryService,
    private createItem:CreateItems,
    private datePipe: DatePipe,
    private createUsers:CreateUsers
  ) { }

  ngOnInit() {
    console.log("this.createLog.logRec.length "+this.createLog.logRec.length)
    for(var i=0; i<this.createLog.logRec.length;i++){
      console.log("log id:"+this.createLog.logRec[i].id+" item id:"+this.createLog.logRec[i].itemId+" desc "+this.createLog.logRec[i].description+" status "+this.createLog.logRec[i].status);
    }
    this.itemId = this.route.snapshot.paramMap.get('id');
    this.logs=this.getLogs(this.itemId);
    if(this.logs.length != 0){
     
      let ITEMLIST=this.createItem.items;
      let item = ITEMLIST.find(item => item.id === this.itemId)
      let catId = item.categoryId;
      let users = this.createUsers.users;
      let logstr = "";
      for(let i=0;i<this.logs.length;i++){
        let user = users.find(user => user.id === this.logs[i].userId);
        let logDate = new Date(this.datePipe.transform(this.logs[i].timestamp,'yyyy-MM-dd'));
        logstr += this.logs[i].id+","+ logDate+","+this.logs[i].remark+","+this.logs[i].status+","+user.username+","+this.logs[i].itemId+","+this.logs[i].description+";"; 
      } 
      
      this.catName=this.catService.getCatName(catId); 
      localStorage.setItem('logs', logstr);
      localStorage.setItem('cat', this.catName);
    }else{
      let logstr = localStorage.getItem('logs');
      this.catName = localStorage.getItem('cat');
      let logListArr=logstr.split(';');
      for(let i=0; i<logListArr.length;i++){
        let logstr = logListArr[i];
        if(isDefined(logstr) || logstr != ""){
          let logstrArr=logstr.split(',');
          let log = new Log(logstrArr[0],logstrArr[5],logstrArr[2],logstrArr[3],logstrArr[1],logstrArr[4],logstrArr[6]);
          this.logs.push(log);
        }
      }
    }
  }
 
  getLogs(itemId: string): Log[] {
    let Logs: Log[] = [];
    for (var i = 0; i < this.createLog.logRec.length; i++) {
        if(this.createLog.logRec[i].itemId===itemId){
            Logs.push(this.createLog.logRec[i]);
        }
    }
    return (Logs);
}
  goBack(): void {
    this.location.back();
  }
 
}

