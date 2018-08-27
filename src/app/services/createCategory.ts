import { Injectable } from '@angular/core';
import { Category } from '../models/category';
@Injectable({ providedIn: 'root' })
export class CreateCategory {
  cats:Category[]=[];
 
  addToCatList(id:string, name:string, desc:string, imagePath:string) {
    let cat:Category;
    cat = new Category(id,name,desc,imagePath);
    this.cats.push(cat);
  }
  clearCatList(){
    this.cats=[];
  }
}