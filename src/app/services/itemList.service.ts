import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Item} from '../models/item';
//import {ITEMLIST } from '../item_db';
import { MessageService } from '../services/message.service';
import {CreateItems} from '../services/createItems';

@Injectable({ providedIn: 'root' })

export class ItemListService{
    ITEMLIST=this.createItem.items;
    constructor(private messageService: MessageService,
        private createItem:CreateItems
    ) { }
    getItems(catid: string): Observable<Item[]> {
        let items: Item[] = [];
        for (var i = 0; i < this.ITEMLIST.length; i++) {
            if(this.ITEMLIST[i].categoryId===catid){
                items.push(this.ITEMLIST[i]);
            }
        }
        return of(items);
    }
}