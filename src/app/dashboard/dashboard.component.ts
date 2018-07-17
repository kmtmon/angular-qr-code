import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import {CategoryService} from '../services/category.service';
import { MessageService } from '../services/message.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categorys: Category[]=[];

  constructor(private catService: CategoryService,
    private messageService: MessageService

  ) { }

  ngOnInit() {
    this.getCats();
  }
  getCats(): void {
    //let len = this.catService.getCatsSize;
    var len:number = this.catService.getCatsSize();
    this.messageService.add("dashboard: len "+len);
    this.catService.getCats()
      .subscribe(cats => this.categorys = cats.slice(0, len));
  }
}
