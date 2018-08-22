import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';

@Injectable({ providedIn: 'root' })
export class CreateItems {
  items:Item[]=[];
  constructor(private afs: AngularFirestore){}
  addToItemList(id:string, catId: string,location:string,status:string,description:string) {
    let item:Item;
    item = new Item(id,catId,location,status,description);
    this.items.push(item);
  }
 
  clearItemList(){
    this.items=[];
  }

  reloadItems(){
    this.clearItemList();
    if(this.items.length == 0){
    let itemDoc = this.afs.firestore.collection(`item`);
    itemDoc.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
            this.addToItemList(doc.id,doc.get('productID'),doc.get('remark'),doc.get('status'),doc.get('description'));
          })
      })   
    }
  }
}