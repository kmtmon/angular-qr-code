import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
//import { CATLIST } from '../category_db';
import { Category } from '../models/category';
import { MessageService } from './message.service';
import {CreateCategory} from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class CategoryService {
    CATLIST= this.createCat.cats;
    postsCol: AngularFirestoreCollection<Category>;
    cats: Observable<Category[]>;
   
    constructor(private messageService: MessageService,
      private createCat:CreateCategory,
      private afs: AngularFirestore,
      private http: HttpClient
    ) {}

    getCatsChange(): Observable<Category[]> {
        return of(this.CATLIST);
    }

    getCatChange(id: string): Observable<Category> {
      return of(this.CATLIST.find(cat => cat.id === id));
    }
  
    getObsCatByName(name: string): Observable<Category> {
      return of(this.CATLIST.find(cat => cat.name === name));
    }
    getCats(): Category[] {
      return (this.CATLIST);
    }    
    getCat(id: string): Category {
      for(let i=0;i<this.createCat.cats.length;i++){
        if(this.CATLIST[i].id == id){
          return this.CATLIST[i];
        }
      }
      //return (this.CATLIST.find(cat => cat.id === id));
    }

    getCatsSize(): number {
      return (this.CATLIST.length);
    }

    getCatName(id: string): string {
      let cat = this.findMatchedCat(id);
      return cat.name;
    }
    findMatchedCat(id:string):Category{
      for(let m=0; m<this.CATLIST.length;m++){
        if(this.CATLIST[m].id == id){
          return this.CATLIST[m];
        }
      }
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error); 
        console.log('${operation} failed: ${error.message}');
        return of(result as T);
      };
    }

    searchCat(term: string): Observable<Category[]> {
      console.log("term.trim(): "+term.trim());
      let matchedCats:Category[]=[];
      let found=false;
      if (!term.trim()) {
        return of([]);
      }
      for(let i=0; i<this.CATLIST.length;i++){

        if(this.CATLIST[i].name.toLowerCase().includes(term)){
          console.log("this.CATLIST[i].name "+this.CATLIST[i].name);
          matchedCats.push(this.CATLIST[i]);
          found=true;
        }
      }
      if(found)
        return of(matchedCats);
      else return of([]);
      /*
      return this.http.get<Category[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(_ => console.log(`found cats matching "${term}"`)),
        catchError(this.handleError<Category[]>('searchCats', []))
      );
      */
    }
}
