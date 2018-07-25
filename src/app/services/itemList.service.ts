import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Item} from '../models/item';
import {ITEMLIST } from '../item_db';
import { MessageService } from '../services/message.service';

@Injectable({ providedIn: 'root' })

export class ItemListService{
    constructor(private messageService: MessageService) { }
    getItems(catid: number): Observable<Item[]> {
        let items: Item[] = [];
        // TODO: send the message _after_ fetching the hero
        for (var i = 0; i < ITEMLIST.length; i++) {
            if(ITEMLIST[i].categoryId===catid){
                items.push(ITEMLIST[i]);
            }
        }
        return of(items);
    }
}