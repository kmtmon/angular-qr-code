import { Component, OnInit } from '@angular/core';
import {Category } from '../models/category';
import {CreateCategory} from '../services/createCategory';
import { Observable, Subject } from 'rxjs';
import {CategoryService} from '../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-search-cat',
  templateUrl: './search-cat.component.html',
  styleUrls: ['./search-cat.component.css']
})
export class SearchCatComponent implements OnInit {
  categories=this.createCat.cats;
  searchCat:string;
  categories$: Observable<Category[]>;
  private searchTerms = new Subject<string>();
  constructor(
    private createCat:CreateCategory,
    private catService:CategoryService,
    private router: Router,
  ) { }

  ngOnInit() {
    
    this.categories$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.catService.searchCat(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
  search1(): void {
    let found = false;
    let cat:Category;
    for(let i=0;i<this.categories.length;i++){
      if(this.searchCat == this.categories[i].name){
        found=true;
        cat=this.categories[i];
      }
    }
    if(found){
      this.router.navigateByUrl('/catDetail/'+cat.id);
    }else{
      alert('Product not found!');
    }
  }
}
