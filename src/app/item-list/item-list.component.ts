import { Component, OnInit,Input,ViewChild } from '@angular/core';
import {Item} from '../models/item';
import { ActivatedRoute, Router } from '@angular/router';
import {ItemListService} from '../services/itemList.service';
import { MessageService } from '../services/message.service'; 
import { ItemService } from '../services/item.service';
import {CreateItems } from '../services/createItems'; 
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';
  import {MatSort, MatTableDataSource} from '@angular/material';

export interface tableElement {
  id: string;
  location: string;
  status: string;
  logLink: string;
  detailLink:string;
}

const ELEMENT_DATA: tableElement[] = []

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() item: Item;
  @ViewChild(MatSort) sort: MatSort;
  items:Item[]=[];
  tableEle:tableElement[] = [];
  availableQty=0;

  displayedColumns: string[] = ['id', 'location', 'status', 'log','details'];
  constructor(private messageService: MessageService,
    private itemListService: ItemListService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private editrouter: Router,
    private createItem:CreateItems,
    private afs: AngularFirestore,
    private linkrouter: Router
  ) { }

  ngOnInit() {
    this.getItems();
   // this.saveItemIntoArray();
  //  let dataSource = new MatTableDataSource(ELEMENT_DATA);
  //  dataSource.sort = this.sort;
  }

  saveItemIntoArray(){ 
    for(let i=0; i<this.items.length; i++){
      ELEMENT_DATA[i].id = this.items[i].id;
      ELEMENT_DATA[i].location = this.items[i].location;
      ELEMENT_DATA[i].status = this.items[i].status;
      ELEMENT_DATA[i].logLink = '/log/'+this.items[i].id;
      ELEMENT_DATA[i].detailLink = '/itemDetails/'+this.items[i].id;
      
    }
  }  

  getItems(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(this.createItem.items.length == 0){
      let str = localStorage.getItem('availableQty');
      this.availableQty =+ str;
      let itemDoc = this.afs.firestore.collection(`item`);
      itemDoc.get().then((querySnapshot) => { 
        let tempitems:Item[]=[];
        querySnapshot.forEach((doc) => {
            this.createItem.addToItemList(doc.id,doc.get('productID'),doc.get('remark'),doc.get('status'));
            let tempitem = new Item(doc.id,doc.get('productID'),doc.get('remark'),doc.get('status'));
            tempitems.push(tempitem);
          })
        for(let i=0;i<tempitems.length;i++){
          if(tempitems[i].categoryId===id){
            this.items.push(tempitems[i]);
          }
        }
      })       
    }else{
      for(let i=0;i<this.createItem.items.length;i++){
        if(this.createItem.items[i].categoryId===id){
          this.items.push(this.createItem.items[i]);
          if(this.createItem.items[i].status == "In warehouse"){
            console.log("add one");
            this.availableQty += 1;
          }
        }
      }
      let str = this.availableQty + "";
      console.log("this.availableQty "+this.availableQty);
      localStorage.setItem('availableQty', str);
    }
  }

}

