import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../services/message.service'; 
import {ItemService} from '../services/item.service';
import {Item} from '../models/item';
import {Category } from '../models/category';
import {CategoryService} from '../services/category.service';
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';
import {CreateItems} from '../services/createItems';
import {CreateCategory} from '../services/createCategory';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() 
  itemId:string;
  item: Item;
  cat:string;
  catId:string;
  remark:string;
  status:string;
  categories=this.createCat.cats;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private messageService: MessageService,
    private editrouter: Router,
    private catService: CategoryService,
    private afs: AngularFirestore,
    private createItems:CreateItems,
    private createCat:CreateCategory
  ) { }

  ngOnInit() {
    this. getItem();
    this. getItemCat();
    
  }


  getItem(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');
   // this.item=this.itemService.getItem(id); 
 
    if(this.createItems.items.length != 0){
      this.item=this.itemService.getItem(this.itemId); 
    }
    
  }

  goBack(): void {
    this.location.back();
  }

  editItem() {
    this.editrouter.navigateByUrl('/itemEdit/'+this.itemId);
  }
  
  getItemCat(){
    if(this.createItems.items.length == 0){
      let itemDoc = this.afs.firestore.collection(`item`);
      itemDoc.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
            this.createItems.addToItemList(doc.id,doc.get('productID'),doc.get('remark'),doc.get('status'),doc.get('description'));
          })
      })   
    }
    let str ="";
    if(this.categories.length==0){
      str = localStorage.getItem('currentItem');
      let strs=str.split(',');
      this.cat=strs[0];
      this.remark=strs[1];
      this.status=strs[2];
   
      let catDoc = this.afs.firestore.collection(`product`);
      catDoc.get().then((querySnapshot) => { 
          querySnapshot.forEach((doc) => {
              this.createCat.addToCatList(doc.id,doc.get('name'),doc.get('desc'),doc.get('imagePath'));
          })
      })    
    }else{
      this.catId=this.item.categoryId;
      let cat = this.categories.find(cat => cat.id === this.catId);
      this.cat = cat.name;  
      this.remark=this.item.location;
      this.status=this.item.status;
      str =  this.cat+","+this.remark+","+this.status;
      localStorage.setItem('currentItem', str);
    }
  }
  elementType : 'url' | 'canvas' | 'img' = 'url';
  /*
  value : string = "{\"id\":\""+this.getId()+"\",\"productID\":\""+
                  this.catId+"\",\"remark\":\""+ this.remark+
                  "\",\"status\":\""+this.status+"\"}";
  */
 value : string ="{\"id\":\""+this.itemId+"\"}";
}

