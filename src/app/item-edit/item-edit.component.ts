import { Component, OnInit, Input,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../services/item.service';
import {Item } from '../models/item';
import { Category } from '../models/category';
import { MessageService } from '../services/message.service'; 
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';   
import {CreateItems} from '../services/createItems';
import {CreateCategory} from '../services/createCategory';
import { isDefined } from '@angular/compiler/src/util';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @Input() item: Item;
  categorys = this.createCat.cats;
  selectedCatId:string;
  itemLocation:string;
  itemStatus:string;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private messageService: MessageService,
    private afs: AngularFirestore,
    private createItem:CreateItems,
    private createCat:CreateCategory,
    public dialog: MatDialog

  ) { }

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.item =this.itemService.getItem(id); 
    this.itemLocation=this.item.location;
    this.itemStatus=this.item.status;
  }

  getId(): number{
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }
  goBack(): void {
    this.location.back();
  }

  updateTodo(item: Item) {
    let todoCollectionRef = this.afs.collection<Item>('item');
    if(!isDefined(item.location))item.location="";
    if(!isDefined(this.selectedCatId))this.selectedCatId=item.categoryId;
 
    todoCollectionRef.doc(item.id).update({
      productID:this.selectedCatId,
      remark:this.itemLocation,
      status:this.itemStatus
    }).then(function() {
        console.log("Item successfully updated!");
      
    });

  }

  getSelectedCat(args){
    this.selectedCatId = args.target.value; 
  }
  saveChange():void{
    let update=false;
    let matchedIndex:number;
    for(let i=0;i<this.createItem.items.length;i++){
      if(this.createItem.items[i].id == this.item.id){
        if(this.itemStatus !=""){
          matchedIndex=i;
          
          update=true;
        }
      }
    }
    if(update){
      let ifok:boolean;
      const dialogRef = this.dialog.open(ItemConfirmDialog, {
        width: '250px',data:"Are you sure to update item?"
      });
      //dialogRef.afterClosed().subscribe(()=>this.goBack());
     
      dialogRef.afterClosed().subscribe(()=> {
        ifok=dialogRef.componentInstance.ifOk;
        console.log("ifok "+ifok);
        if(ifok){
          this.updateTodo(this.createItem.items[matchedIndex]);
          this.createItem.items[matchedIndex].categoryId=this.selectedCatId;
          this.createItem.items[matchedIndex].location=this.itemLocation;
          this.createItem.items[matchedIndex].status=this.itemStatus;
          this.goBack();
        }
      });
     
    }else{
      alert('Status is a required field');
    }
  }

}


@Component({
  selector: 'confirm_dialog',
  templateUrl: 'confirm_dialog.html',
})
export class ItemConfirmDialog {
  
  ifOk:boolean;
  constructor(
    public dialogRef: MatDialogRef<ItemConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  okClick(): void {
    this.dialogRef.close();
    this.ifOk=true;
  }
  cancel():void{
    this.dialogRef.close();
    this.ifOk=false;
  }
}