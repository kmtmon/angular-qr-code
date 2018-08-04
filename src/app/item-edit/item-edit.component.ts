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
    for(let i=0;i<this.createItem.items.length;i++){
      if(this.createItem.items[i].id == this.item.id){
        if(this.itemStatus !=""){
          this.updateTodo(this.createItem.items[i]);
          this.createItem.items[i].categoryId=this.selectedCatId;
          this.createItem.items[i].location=this.itemLocation;
          this.createItem.items[i].status=this.itemStatus;
          update=true;
        }
      }
    }
    if(update){
      const dialogRef = this.dialog.open(ItemConfirmDialog, {
        width: '250px',data:"Item successfully updated!"
      });
      dialogRef.afterClosed().subscribe(()=>this.goBack());
    }else{
      const dialogRef = this.dialog.open(ItemConfirmDialog, {
        width: '250px',data:"Status is a required field"
      });
      dialogRef.afterClosed();
    }
  }

}


@Component({
  selector: 'confirm_dialog',
  templateUrl: 'confirm_dialog.html',
})
export class ItemConfirmDialog {

  constructor(
    public dialogRef: MatDialogRef<ItemConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}