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

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
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
    private createItem:CreateItems
  ) { }

  ngOnInit() {
    this.itemId = this.route.snapshot.paramMap.get('id');
    let ITEMLIST=this.createItem.items;
    let item = ITEMLIST.find(item => item.id === this.itemId)
    let catId = item.categoryId;
   // this.getLogs();
    this.catName=this.catService.getCatName(catId);
    this.getLogs();
  }
 
  getLogs(): void {
    this.logService.getLogs( this.itemId).subscribe(logs => this.logs = logs);; 
  }
  goBack(): void {
    this.location.back();
  }
 
}

