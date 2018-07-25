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
        return of(CATLIST);
      }
    
    getCat(id: number): Observable<Category> {
      return of(CATLIST.find(cat => cat.id === id));
    }

    getCatsSize(): number {
      return (CATLIST.length);
    }

    getCatName(id: number): string {
      var cat= CATLIST.find(cat => cat.id === id);
      return cat.name;
    }

}
