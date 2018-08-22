import { Component, OnInit,ViewChild,Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import {MessageService}  from '../services/message.service';
import { isDefined } from '@angular/compiler/src/util';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import { Item } from '../models/item';
import { STATUS } from '../models/status';
import {CreateCategory} from '../services/createCategory';
import {CreateItems} from '../services/createItems';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Log } from '../models/log';
import {LogService} from '../services/log.service';
import {CreateLog} from '../services/createLog';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  categorys = this.createCat.cats;
  selectedCatId:string;
  selectedStatus:string;
  qtyArr:number[] = [];
  selectedQty:number;
  status:string[]=[];
  description: string;

  constructor(   
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private location: Location,
    private messageService: MessageService,
    private afs: AngularFirestore,
    private createCat:CreateCategory,
    private createItems:CreateItems,
    public dialog: MatDialog,
    private logService: LogService,
    private createLog:CreateLog
  ) { }


  ngOnInit() {
    for(let i=0;i<20; i++){
      this.qtyArr[i]=i+1;
    }
    for(let i=0;i<2; i++){
      this.status[i]=STATUS[i];
    }
  }

  getSelectedCat(args){
    this.selectedCatId = args.target.value; 
  }
  getSelectedQty(args){
    this.selectedQty =+ args.target.value; 
  }
  getSelectedStatus(args){
    this.selectedStatus = args.target.value; 
  }
  getCurrentUser():string{
    let user=localStorage.getItem('currentUser');
    let userStr:string[] = user.split(',');
    let userNameStr = userStr[0];
    let unstr:string[]=userNameStr.split('\"');
    return unstr[3];
  }
  submit(){
    let errorMsg="";
    let currentDate =+ Date.now()/1000;
    if(this.selectedCatId == "Choose product" || !isDefined(this.selectedCatId))errorMsg+="Invalid product!\n";
    if( !isDefined(this.selectedQty))errorMsg+="Invalid quantity!\n";
    if(this.selectedStatus == "Select status" || !isDefined(this.selectedStatus))errorMsg+="Invalid status!\n";
    if(errorMsg!="")alert(errorMsg);
    else{
      let ifok:boolean;
      const dialogRef = this.dialog.open(ItemAddConfirmDialog, {
        width: '250px',data:"Are you sure to add new product?"
      });
      
      dialogRef.afterClosed().subscribe(()=> {
        ifok=dialogRef.componentInstance.ifOk;
        if(ifok){
          for(let i=0;i< this.selectedQty;i++){
            this.afs.collection('item').add({'id':i+"",'productID': this.selectedCatId, 'remark': '','status':this.selectedStatus, 'description':this.description});   
          }
          alert('Items successfully added!');

          let itemDoc = this.afs.firestore.collection(`item`);
          itemDoc.get().then((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
              for(let i=0; i<this.selectedQty; i++){
                if(doc.get('id')==(i+"")){
                 this.afs.collection('log').add({'id':null,'itemId':doc.id, 'remark': '','status':this.selectedStatus,'timestamp':currentDate,'userId':this.getCurrentUser()});
                 let todoCollectionRef = this.afs.collection<Item>('item');
                 todoCollectionRef.doc(doc.id).update({
                 id:null
                })
                }
              }
            })
          })       
          this.goBack();
        }   
      });
    }
  }
  goBack(): void {
    this.location.back();
    //this.router.navigate(['/dashboard']);
  }
}


@Component({
  selector: 'confirm_dialog',
  templateUrl: 'confirm_dialog.html',
})
export class ItemAddConfirmDialog {
  
  ifOk:boolean;
  constructor(
    public dialogRef: MatDialogRef<ItemAddConfirmDialog>,
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