import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService } from '../services/message.service'; 
import {ItemService} from '../services/item.service';
import {Item} from '../models/item';
import {Category } from '../models/category';
import {CategoryService} from '../services/category.service';
@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  @Input() item: Item;
  cat:string;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private messageService: MessageService,
    private editrouter: Router,
    private catService: CategoryService
  ) { }

  ngOnInit() {
    
    this. getItem();
    this. getItemCat();
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log("item details id "+id);
    this.itemService.getItem(id)
      .subscribe(item => this.item = item); 
  }

  getId() : string{
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }
  goBack(): void {
    this.location.back();
  }

  editItem() {
    this.editrouter.navigateByUrl('/itemEdit/'+this.item.id);
  }
  
  getItemCat(){
    const id = this.route.snapshot.paramMap.get('id');
    this.itemService. getItem(id)
      .subscribe(item => this.item = item); 
    this.cat = this.catService.getCatName(this.item.categoryId);

  }
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string =   "item-"+this.getId();

}
