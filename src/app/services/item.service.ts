import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import { ITEMLIST } from '../item_db';
import { Item } from '../models/item';
import { MessageService } from './message.service';
import {ItemListService} from './itemList.service';
import {CreateItems} from '../services/createItems';
@Injectable({ providedIn: 'root' })
export class ItemService   {
    constructor( 
        private messageService: MessageService,
        private createItem:CreateItems
    ) { }
    ITEMLIST=this.createItem.items;
    getItemChange(id: string): Observable<Item> {
        return of(this.ITEMLIST.find(item => item.id === id));
    }
    getItem(id: string): Item {
        return (this.ITEMLIST.find(item => item.id === id));
    }
}