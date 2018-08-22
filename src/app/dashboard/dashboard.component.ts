import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { MessageService } from '../services/message.service';
import { CreateCategory } from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import {CreateItems } from '../services/createItems'; 
import {Log } from '../models/log';
import {Item } from '../models/item';
import {LogService} from '../services/log.service';
import {CreateLog} from '../services/createLog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categorys: Category[];
  postsCol: AngularFirestoreCollection<Category>;
  cats: Observable<Category[]>;
  constructor(private catService: CategoryService,
    private messageService: MessageService,
    private createCat: CreateCategory,
    private afs: AngularFirestore,
    private createItems:CreateItems,
    private logService: LogService,
    private createLog:CreateLog
  ) { }

  ngOnInit() {
    
    this.messageService.add("dashboard....");
    this.categorys = this.createCat.cats;
    /*
    this.createItems.clearItemList();
    let itemDoc = this.afs.firestore.collection(`item`);
    itemDoc.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
            this.createItems.addToItemList(doc.id,doc.get('productID'),doc.get('remark'),doc.get('status'));
          })
    })       
    */
   this.createItems.reloadItems();
  
  }
  updateLog() {
    this.createItems.items;
    this.logService.LOGLIST;
  }
  getCats(): void {
    //let len = this.catService.getCatsSize;
    var len: number = this.catService.getCatsSize();
    this.categorys = this.catService.getCats();
  }
}