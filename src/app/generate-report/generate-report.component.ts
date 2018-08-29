import { Component, OnInit ,Inject} from '@angular/core';
import * as jsPDF from 'jspdf';
import { DatePipe, NumberSymbol } from '@angular/common';
import {Log } from '../models/log';
import {User } from '../models/user';
import {Item } from '../models/item';
import {Category } from '../models/category';
import {LogService} from '../services/log.service';
import {CreateLog} from '../services/createLog';
import { timestamp } from 'rxjs/operators';
import {MessageService } from '../services/message.service';
import {CreateUsers} from '../services/createUsers';
import {CreateCategory} from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import { CreateItems } from '../services/createItems';
import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
  providers:[
    { provide: 'Window', useValue:window},
    DatePipe
  ]
})
export class GenerateReportComponent implements OnInit {
  dateTime1:string;
  users:User[]=[];
  logs:Log[]=[];
  cats:Category[]=[];
  items:Item[]=[];
  rowText:number;
  rowLine:number;
  breakDownIndex:number;
  selectedBy:string;
  direction:string;
  selectedMethods=['Item code','Log date', 'Remark', 'Status'];
  dirs=['Descending', 'Ascending'];
  
  constructor(
    @Inject('Window') private window: Window,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private logService: LogService,
    private createUser:CreateUsers,
    private createLog:CreateLog,
    private createCat:CreateCategory,
    private createItem:CreateItems,
    private afs: AngularFirestore
  ) { 
    this.messageService.add("generate report.....");
  }

  ngOnInit() {
    this.getAllData();
  }

  getAllData(){
    let catDoc = this.afs.firestore.collection(`product`);
    if(this.createCat.cats.length == 0){
      catDoc.get().then((querySnapshot) => { 
        let tempcats:Category[]=[];
          querySnapshot.forEach((doc) => {
              let tempcat = new Category(doc.id,doc.get('name'),doc.get('desc'),doc.get('imagePath'));
              tempcats.push(tempcat);
          })
          this.cats=tempcats;
      })   
    }else{
      this.cats=this.createCat.cats;
    }

    let userDoc = this.afs.firestore.collection(`user`);
    if(this.createUser.users.length == 0){
      userDoc.get().then((querySnapshot) => { 
        let tempUsers:User[]=[];
          querySnapshot.forEach((doc) => {
              let tempuser = new User(doc.id,doc.get('email'),doc.get('password'),"","");
              tempUsers.push(tempuser);
          })
          this.users=tempUsers;
      })   
    }else{
      this.users=this.createUser.users;
    }

    let logDoc = this.afs.firestore.collection(`log`);
    if(this.createLog.logRec.length == 0){
      logDoc.get().then((querySnapshot) => { 
        let tempLogs:Log[]=[];
          querySnapshot.forEach((doc) => {
              let timestamp=+doc.get('timestamp')/1000;
              let timestampstr =timestamp+"";
              let templog = new Log(doc.id,doc.get('itemId'),doc.get('remark'),doc.get('status'),timestampstr,doc.get('userId'),doc.get('description'));
              tempLogs.push(templog);
          })
          this.logs=tempLogs;
      })    
    }else{
      this.logs=this.createLog.logRec;
    }

    let itemDoc = this.afs.firestore.collection(`item`);
    if(this.createLog.logRec.length == 0){
      itemDoc.get().then((querySnapshot) => { 
        let tempItems:Item[]=[];
          querySnapshot.forEach((doc) => {
              let tempitem = new Item(doc.id,doc.get('productID'),doc.get('remark'),doc.get('status'),doc.get('description'));
              tempItems.push(tempitem);
          })
          this.items=tempItems;
      })    
    }else{
      this.items=this.createItem.items;
    }
  }

  getCatNameByItem(itemId:string):string{
    let item = this.items.find(item => item.id==itemId);
    if(!isDefined(item)){
      console.log("item "+itemId+" has invalid cat");
      return "Invalid";
    }
    else{
      let catid = item.categoryId;
      let cat =this.cats.find(cat => cat.id == catid);
      return cat.name;
    }
  }
  createAPage(doc:jsPDF,rowText1:number,rowLine1y:number,logs:Log[],dateStr:string,date:Date,firstPage:boolean){
    doc.setFontType("bold");
    doc.setFontSize(11);
    doc.text(7, rowText1, "Log Date");
    doc.text(40, rowText1, "Item Code");
    doc.text(80, rowText1, "Product");
    doc.text(120, rowText1, "Remark");
    doc.text(170, rowText1, "Status");
    doc.text(220, rowText1, "Description");
    doc.text(270, rowText1, "Modified by");

    doc.line(5, rowLine1y, 295, rowLine1y);

    let gapBtwTextLine = 2;
    let line0x = 5;
    let line1x = 25;
    let line2x = 70;
    let line3x = 105;
    let line4x = 150;
    let line5x = 200;
    let line6x = 250;

    doc.setFontType("normal");
    doc.setFontSize(9);
    let username="";
    let desc ="";
    let remark="";
    let maxLen=0;
    if(!firstPage){
      this.rowText = rowText1;
      this.rowLine = rowLine1y;
    }
  
    for (let i = this.breakDownIndex; i <logs.length; i++) {
   
      let logDate = new Date(this.datePipe.transform(logs[i].timestamp,'yyyy-MM-dd h:mm:ss'));
      dateStr= this.datePipe.transform(logDate,'dd-MM-yyyy');
      if(logDate <= date){
        let user = this.users.find(user => user.id === logs[i].userId);
        let catName = this.getCatNameByItem(logs[i].itemId);
        this.rowText += 10;
        this.rowLine += 10;
        doc.text(line0x+gapBtwTextLine, this.rowText, dateStr);
        doc.text(line1x+gapBtwTextLine, this.rowText, logs[i].itemId);
        catName= doc.splitTextToSize(catName,40);
        doc.text(line2x+gapBtwTextLine, this.rowText, catName);
        remark=doc.splitTextToSize(logs[i].remark,40);
        doc.text(line3x+gapBtwTextLine, this.rowText,remark);
        
        doc.text(line4x+gapBtwTextLine, this.rowText, logs[i].status);
        if(!isDefined(logs[i].description))logs[i].description="";
        desc =doc.splitTextToSize(logs[i].description,40);
        doc.text(line5x+gapBtwTextLine, this.rowText, desc);
        username=user.username;
        username= doc.splitTextToSize(username,40);
        doc.text(line6x+gapBtwTextLine, this.rowText,username );
        let maxLen = Math.max(username.length, catName.length, remark.length,desc.length);
        if(maxLen > 0){
          this.rowLine+=5*(maxLen-1);
          this.rowText += 5*(maxLen-1);
        }
        doc.line(5, this.rowLine, 295, this.rowLine);
        if(this.rowLine>180){
          this.breakDownIndex=i+1;
          break;  
        }
      }
      if(i==logs.length-1)this.breakDownIndex=logs.length;
    }
    doc.line(5, 40, 5, this.rowLine);
    doc.line(5, 40, 295, 40);
    doc.line(295, 40, 295, this.rowLine);

    doc.line(line1x, 40, line1x, this.rowLine);
    doc.line(line2x, 40, line2x, this.rowLine);
    doc.line(line3x, 40, line3x, this.rowLine);
    doc.line(line4x, 40, line4x, this.rowLine);
    doc.line(line5x, 40, line5x, this.rowLine);
    doc.line(line6x, 40, line6x, this.rowLine);
    doc.addPage();
  }

  getSortedVal(args){
    this.selectedBy = args.target.value; 
  }
  
  getDir(args){
    this.direction = args.target.value; 
  }

  sortLogs():Log[]{
    if(isDefined(this.selectedBy) && this.selectedBy != "--Select--"){
      if(!isDefined(this.direction) || this.direction == "--Select--"){
        alert('Invalid Sort direction!');
      }
    }
    let dir:boolean;
    if(this.direction == "Descending" )dir=true;
    else dir=false;
    //'Item code','Log date', 'Remark', 'Status','Modified by'
    let sortedLog:Log[]=[];
    switch(this.selectedBy){
      case 'Item code': sortedLog=this.sortByItemId(dir);break;
      case 'Log date': sortedLog=this.sortByDate(dir);break;
      case 'Remark': sortedLog=this.sortByLocation(dir);break;
      case 'Status': sortedLog=this.sortByStatus(dir);
    }
    return sortedLog;
  }

  download() {
    let sortedLog = this.sortLogs();
    if(sortedLog.length==0) sortedLog=this.createLog.logRec;
  // this.sortByDate();
   //return;
    var doc = new jsPDF('landscape');
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(20);
    doc.text(130, 20, "Item Log Report");
 
    let date = new Date(this.dateTime1);
    let currentDate = Date.now();
    let dateStr = "";
    let currentDateStr=this.datePipe.transform(currentDate,'dd-MM-yyyy');
    var logDate = new Date(date);
    logDate.setDate(logDate.getDate() + 1);
    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(10,35,"Generated Date: "+currentDateStr);
    doc.text(60,35,"Till :"+this.datePipe.transform(date,'dd-MM-yyyy'));
   
    let rowText1 = 50;
    let rowLine1y = 55;
    this.breakDownIndex=0;
    this.rowText = rowText1;
    this.rowLine = rowLine1y;
    let firstPage=true;
    this.createAPage(doc,rowText1,rowLine1y,sortedLog,dateStr,logDate,firstPage);
    while( this.breakDownIndex < this.logs.length){
      if(this.rowLine > 170){
        firstPage=false;
        this.createAPage(doc,rowText1,rowLine1y,sortedLog,dateStr,logDate,firstPage);
      }
    }
    doc.save('Report'+currentDateStr+'.pdf');
    
  }

  sortByItemId(desc:boolean):Log[]{
    let tempLogs = this.logs;
    tempLogs.sort(function(a,b){
      let a1 = a.itemId.toLowerCase();
      let b1 = b.itemId.toLowerCase();
      if(a1 > b1){
        if(desc)return -1;
        else return 1;
      }else if(a1 < b1){
        if(desc)return 1;
        else return -1;
      }
      else return 0;
    });
    return tempLogs;
  }

  sortByUser(desc:boolean):Log[]{
    let tempLogs = this.logs;
    tempLogs.sort(function(a,b){
      if(a.userId > b.remark){
        if(desc)return -1;
        else return 1;
      }else if(a.remark < b.remark){
        if(desc)return 1;
        else return -1;
      }
      else return 0;
    });
    return tempLogs;
  }

  sortByDate(desc:boolean):Log[]{
    let tempLogs = this.logs;
    tempLogs.sort(function(a,b){
      if(a.timestamp > b.timestamp){
        if(desc)return -1;
        else return 1;
      }else if(a.timestamp < b.timestamp){
        if(desc)return 1;
        else return -1;
      }
      else return 0;
    });

    return tempLogs;
  }

  sortByLocation(desc:boolean):Log[]{
    let tempLogs = this.logs;
    tempLogs.sort(function(a,b){
      if(a.remark > b.remark){
        if(desc)return -1;
        else return 1;
      }else if(a.remark < b.remark){
        if(desc)return 1;
        else return -1;
      }
      else return 0;
    });
    return tempLogs;
  }

  sortByStatus(desc:boolean):Log[]{
    let tempLogs = this.logs;
    tempLogs.sort(function(a,b){
      if(a.status > b.status){
        if(desc)return -1;
        else return 1;
      }else if(a.status < b.status){
        if(desc)return 1;
        else return -1;
      }
      else return 0;
    });
    return tempLogs;
  }

}
