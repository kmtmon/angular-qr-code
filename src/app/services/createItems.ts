import { Injectable } from '@angular/core';
import { Item } from '../models/item';
@Injectable({ providedIn: 'root' })
export class CreateItems {
  items:Item[]=[];
 
  addToItemList(id:string, catId: string,location:string,status:string) {
    let item:Item;
    item = new Item(id,catId,location,status);
    this.items.push(item);
  }
 
}