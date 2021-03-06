import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item';
import { Category } from '../models/category';
import { MessageService } from '../services/message.service';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';   
import {CreateItems} from '../services/createItems';
import {CreateCategory} from '../services/createCategory';
import {CreateLog} from '../services/createLog';
import { isDefined } from '@angular/compiler/src/util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { STATUS } from '../models/status';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @Input() item: Item;
  categorys = this.createCat.cats;
  selectedCatId: string;
  itemLocation: string;
  itemStatus: string;
  status = STATUS;
  description: string;
  fl: string;
  rn: string;
  rl: string;
  rc: string;

  showLocation = false;

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private messageService: MessageService,
    private afs: AngularFirestore,
    private createItem:CreateItems,
    private createCat:CreateCategory,
    private createLog:CreateLog,
    public dialog: MatDialog

  ) { }

  ngOnInit() {
    this.getItem();
    this.getLocation();
  }

  getSelectedStatus(args) {
    this.itemStatus = args.target.value;
    this.showLocation = this.itemStatus === "In warehouse"
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.item = this.itemService.getItem(id);
    //this.itemLocation=this.item.location;
    this.itemStatus=this.item.status;
    this.description = this.item.description;
  }

  getLocation() {
    if (isDefined(this.item.location)) {
    }
    if (isDefined(this.item.location)) {
      if (this.item.location != "") {
        let location = this.item.location;
        let lcs: string[] = location.split('-');
        console.log(lcs[0].substring(2) + " " + lcs[1] + " " + lcs[2] + " " + lcs[3]);
        this.fl = lcs[0].substring(2);
        this.rn = lcs[1].substring(2);
        this.rl = lcs[2].substring(2);
        this.rc = lcs[3].substring(2);
      }
    }
  }
  getId(): number {
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }
  goBack(): void {
    this.location.back();
  }
  getCurrentUser(): string {
    let user = localStorage.getItem('currentUser');
    let userStr: string[] = user.split(',');
    let userNameStr = userStr[0];
    let unstr: string[] = userNameStr.split('\"');
    return unstr[3];
  }
  updateTodo(item: Item) {
    let todoCollectionRef = this.afs.collection<Item>('item');

    if (!isDefined(this.itemLocation)) this.itemLocation = "";
    if (!isDefined(this.selectedCatId)) this.selectedCatId = item.categoryId;
    if (!isDefined(this.itemStatus) || this.itemStatus == "Select status") this.itemStatus = this.item.status;

    todoCollectionRef.doc(item.id).update({
      productID: this.selectedCatId,
      remark: this.itemLocation,
      status: this.itemStatus,
      description: this.description
    }).then(function () {
      console.log("Item successfully updated!");
    });
  }

  getSelectedCat(args) {
    this.selectedCatId = args.target.value;
  }

  saveChange() {
    if (this.fl === undefined ||
      this.rn === undefined ||
      this.rl === undefined ||
      this.rc === undefined) {

      this.itemLocation = ''
    } else {
      this.itemLocation = "FL" + this.fl + "-RN" + this.rn + "-RL" + this.rl + "-RC" + this.rc;
    }

    let update = false;
    let matchedIndex: number;
    for (let i = 0; i < this.createItem.items.length; i++) {
      if (this.createItem.items[i].id == this.item.id) {
        if (this.itemStatus != "") {
          matchedIndex = i;
          update = true;
        }
      }
    }
    if (update) {
      let ifok: boolean;
      const dialogRef = this.dialog.open(ItemConfirmDialog, {
        width: '250px', data: "Are you sure to update item?"
      });
     let currentDate = + Date.now()/1000;
      dialogRef.afterClosed().subscribe(() => {
        ifok = dialogRef.componentInstance.ifOk;
        if (ifok) {
          this.updateTodo(this.createItem.items[matchedIndex]);
          this.createItem.items[matchedIndex].categoryId=this.selectedCatId;
          this.createItem.items[matchedIndex].location=this.itemLocation;
          this.createItem.items[matchedIndex].status=this.itemStatus;
          this.createItem.items[matchedIndex].description=this.description;
          
          this.afs.collection('log').add({'id':null,'itemId':this.createItem.items[matchedIndex].id, 'remark': this.itemLocation,'status':this.itemStatus,'timestamp':currentDate,'userId':this.getCurrentUser(),'description':this.description});
          this.createLog.reloadLogs();
         
          this.goBack();
        }
      });

    } else {
      alert('Status is a required field');
    }
  }
}

@Component({
  selector: 'confirm_dialog',
  templateUrl: 'confirm_dialog.html',
})
export class ItemConfirmDialog {

  ifOk: boolean;
  constructor(
    public dialogRef: MatDialogRef<ItemConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  okClick(): void {
    this.dialogRef.close();
    this.ifOk = true;
  }
  cancel(): void {
    this.dialogRef.close();
    this.ifOk = false;
  }
}