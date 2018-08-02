import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import {CategoryService} from '../services/category.service';
import { MessageService } from '../services/message.service'; 
import {CreateCategory} from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categorys: Category[];
  postsCol: AngularFirestoreCollection<Category>;
  cats: Observable<Category[]>;
  constructor(private catService: CategoryService,
    private messageService: MessageService,
    private createCat:CreateCategory,
    private afs: AngularFirestore
  ) { }
  
  ngOnInit() {
    this.getCats();
  }
  
  getCats(): void {
    //let len = this.catService.getCatsSize;
    var len:number = this.catService.getCatsSize();
    this.categorys=this.catService.getCats();
      
  }
}
