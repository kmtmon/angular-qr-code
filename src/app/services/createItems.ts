import { Injectable } from '@angular/core';
import { Item } from '../models/item';
@Injectable({ providedIn: 'root' })
export class CreateItems {
  items:Item[]=[];
 
  addToItemList(id:string, catId: string,location:string) {
    let item:Item;
    item = new Item(id,catId,location);
    this.items.push(item);
  }
 
}