import { Component,HostListener, OnInit,Inject ,ChangeDetectionStrategy} from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import {CreateCategory} from './services/createCategory';
import {MessageService } from './services/message.service';
import {CreateItems } from './services/createItems'; 
import {CreateLog } from './services/createLog';
import {CreateUsers } from './services/createUsers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*
  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(event){
      localStorage.clear();
  }*/
  constructor(
    private afs: AngularFirestore,
    private createCat:CreateCategory,
    private messageService: MessageService,
    private createItems:CreateItems,
    private createLog:CreateLog,
    private createUsers:CreateUsers
  ){
    this.messageService.add("app.component.....");
    if(this.createUsers.users.length==0){
        let userDoc = this.afs.firestore.collection(`user`);
        userDoc.get().then((querySnapshot) => { 
            querySnapshot.forEach((doc) => {
                this.createUsers.addToUseList(doc.id,doc.get('email'),doc.get('password'));
            })
        })    
    }
    let catDoc = this.afs.firestore.collection(`product`);
    catDoc.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
            this.createCat.addToCatList(doc.id,doc.get('name'),doc.get('desc'),doc.get('imagePath'));
        })
    })    
   
    let itemDoc = this.afs.firestore.collection(`item`);
    itemDoc.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
            this.createItems.addToItemList(doc.id,doc.get('productID'),doc.get('remark'),doc.get('status'));
        })
    })       

    let logDoc = this.afs.firestore.collection(`log`);
    logDoc.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
            this.createLog.addToLogList(doc.id,doc.get('itemId'),doc.get('remark'),doc.get('status'),doc.get('timestamp'),doc.get('userId'));
        })
    }) 
  }
}
