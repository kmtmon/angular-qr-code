import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../services/category.service';
import {Category } from '../models/category';
import { MessageService } from '../services/message.service'; 

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  @Input() category: Category;
  constructor(private route: ActivatedRoute,
    private catService: CategoryService,
    private location: Location,
    private messageService: MessageService,
    private editrouter: Router
  ) { }

  ngOnInit() {
    this.getCat();
  }

  getCat(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.category=this.catService.getCat(id);
     
  }

  getId() : string{
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }
  goBack(): void {
    this.location.back();
  }

  editCategory() {
    this.editrouter.navigateByUrl('/catDetailEdit/'+this.category.id);
  }
  

  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string =   "category-"+this.getId();

}
