import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {MessageService } from '../services/message.service';

import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { CreateCategory } from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';




@Component({
    templateUrl: 'home.component.html',
    selector: 'app-home',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
	
	categorys: Category[];
  postsCol: AngularFirestoreCollection<Category>;
  cats: Observable<Category[]>;

    constructor(private userService: UserService,
        private  messageService: MessageService,
       private catService: CategoryService,
    private createCat: CreateCategory,
    private afs: AngularFirestore
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       this.messageService.add("home.....");
     
    }

    ngOnInit() {
        this.loadAllUsers();
		this.getCats();
    }
  
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    getCurrentUser():User{
        return this.currentUser;
    } 

  
  getCats(): void {
    //let len = this.catService.getCatsSize;
    var len: number = this.catService.getCatsSize();
    this.categorys = this.catService.getCats();
  }
	
}