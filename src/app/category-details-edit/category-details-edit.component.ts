import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../services/category.service';
import {Category } from '../models/category';
import { MessageService } from '../services/message.service'; 
@Component({
  selector: 'app-category-details-edit',
  templateUrl: './category-details-edit.component.html',
  styleUrls: ['./category-details-edit.component.css']
})
export class CategoryDetailsEditComponent implements OnInit {
  @Input() category: Category;
  constructor(
    private route: ActivatedRoute,
    private catService: CategoryService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getCat();
  }

  getCat(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.messageService.add("category details: id="+id);
    this.catService.getCat(id)
      .subscribe(cat => this.category = cat); 
  }
  goBack(): void {
    this.location.back();
  }
}

