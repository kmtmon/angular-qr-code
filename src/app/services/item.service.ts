import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ITEMLIST } from '../item_db';
import { Item } from '../models/item';
import { MessageService } from './message.service';
import {ItemListService} from './itemList.service';
@Injectable({ providedIn: 'root' })
export class ItemService   {

    constructor( private messageService: MessageService) { }

    getItem(id: number): Observable<Item> {
       
        return of(ITEMLIST.find(item => item.id === id));
      }

}