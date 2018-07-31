import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import { CATLIST } from '../category_db';
import { Category } from '../models/category';
import { MessageService } from './message.service';
import {CreateCategory} from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
@Injectable({ providedIn: 'root' })

export class CategoryService {
    CATLIST= this.createCat.cats;
    postsCol: AngularFirestoreCollection<Category>;
    cats: Observable<Category[]>;
    constructor(private messageService: MessageService,
      private createCat:CreateCategory,
      private afs: AngularFirestore
    ) {
      //this.CATLIST ;
      
     }

    getCats(): Observable<Category[]> {
      
        return of(this.CATLIST);
      }
    
  
    getCat(id: string): Observable<Category> {
      return of(this.CATLIST.find(cat => cat.id === id));
    }

    getCatsSize(): number {
    
      return (this.CATLIST.length);
    }

    getCatName(id: string): string {
      var cat= this.CATLIST.find(cat => cat.id === id);
      return cat.name;
    }

}
