import { Component, OnInit ,Inject} from '@angular/core';
import * as jsPDF from 'jspdf';
import { DatePipe } from '@angular/common';
import {Log } from '../models/log';
import {LogService} from '../services/log.service';
import {CreateLog} from '../services/createLog';
import { timestamp } from 'rxjs/operators';
import {MessageService } from '../services/message.service';
import {CreateUsers} from '../services/createUsers';
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
  matchedlogs:Log[]=[];
  constructor(
    @Inject('Window') private window: Window,
    private datePipe: DatePipe,
    private messageService: MessageService,
    private logService: LogService,
    private createUser:CreateUsers
  ) { 
    this.messageService.add("generate report.....");
  }

  ngOnInit() {

  }

  getMatchedLogs(){
    
   
    let logs=this.logService.LOGLIST;
    let date = new Date(this.dateTime1);
    console.log(date.getTime());
    var selectedts = date.getTime();
    for (let i = 0; i <logs.length; i++) {
      var logtms =+logs[i].timestamp;
      if(logtms<=selectedts){
        this.matchedlogs.push(logs[i]);
      }
    }
  }

  download() {
    var doc = new jsPDF('p','pt','a4');
    doc.setFontSize(15);
    doc.text(10, 20, "Header");
    doc.setFontSize(10);
    let logs=this.logService.LOGLIST;
    let users=this.createUser.users;
    let date = new Date(this.dateTime1);
    let currentDate = Date.now();
    let dateStr = "";
    let currentDateStr=this.datePipe.transform(currentDate,'yyyy-MM-dd');
    let text = "Log Date\tItem Code\tRemark\tStatus\tModified by\n";
    for (let i = 0; i <logs.length; i++) {
      let logDate = new Date(this.datePipe.transform(logs[i].timestamp,'yyyy-MM-dd'));
      dateStr= this.datePipe.transform(logDate,'yyyy-MM-dd');
      if(logDate <= date){
        let user = users.find(user => user.id === logs[i].userId);
        text = text + dateStr+"\t"+logs[i].itemId+"\t"+logs[i].remark+"\t"+logs[i].status+"\t"+user.username+"\n";
      }
    }

    
    doc.text(20, 30, text);
   
   // doc.setFont("courier");
   // doc.setTextColor(255,20, 100);
    
    doc.addPage();
    doc.save('Report'+currentDateStr+'.pdf');
    
  }
}
