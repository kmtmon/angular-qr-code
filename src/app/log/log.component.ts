import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../services/item.service';
import {Item } from '../models/item';
import { CATLIST } from '../category_db';
import {Category} from '../models/category';
import {CategoryService } from '../services/category.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  @Input() item: Item;
  cat:Category;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private catService: CategoryService
  ) { }

  ngOnInit() {
    this.getItem();
    this.getCat();
  }
  getCat(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.catService.getCat(id).subscribe(cat => this.cat = cat); 
  }
  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id).subscribe(item => this.item = item); 
  }
  goBack(): void {
    this.location.back();
  }
}

