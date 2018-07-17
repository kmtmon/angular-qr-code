import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CATLIST } from '../category_db';
import { Category } from '../models/category';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })

export class CategoryService {
    constructor(private messageService: MessageService) { }
    getCats(): Observable<Category[]> {
        this.messageService.add('CategoryService: fetched categorys');
        return of(CATLIST);
      }
    
      getCat(id: number): Observable<Category> {
        this.messageService.add(`CategoryService: fetched category id=${id}`);
        return of(CATLIST.find(cat => cat.id === id));
      }

      getCatsSize(): number {
        return (CATLIST.length);
      }
}
