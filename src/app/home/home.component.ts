import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import {MessageService } from '../services/message.service';

@Component({
    templateUrl: 'home.component.html',
    selector: 'app-home',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService,
        private  messageService: MessageService,
       
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
       this.messageService.add("home.....");
     
    }

    ngOnInit() {
        this.loadAllUsers();
    }
  
    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => { 
            this.users = users; 
        });
    }

    getCurrentUser():User{
        return this.currentUser;
    }
}