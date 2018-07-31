import { Injectable } from '@angular/core';
import { Category } from '../models/category';
@Injectable({ providedIn: 'root' })
export class CreateCategory {
  cats:Category[]=[];
 
  addToCatList(id:string, name:string, desc:string) {
    let cat:Category;
    cat = new Category(id,name,desc);
    this.cats.push(cat);
  }
 
}