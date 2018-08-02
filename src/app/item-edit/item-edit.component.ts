import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ItemService } from '../services/item.service';
import {Item } from '../models/item';
import { CATLIST } from '../category_db';
import { Category } from '../models/category';
import { MessageService } from '../services/message.service'; 
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css']
})
export class ItemEditComponent implements OnInit {
  @Input() item: Item;
  categorys = CATLIST;
  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private location: Location,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.itemService.getItem(id).subscribe(item => this.item = item); 
  }

  getId(): number{
    const id = +this.route.snapshot.paramMap.get('id');
    return id;
  }
  goBack(): void {
    this.location.back();
  }
  
  elementType : 'url' | 'canvas' | 'img' = 'url';
  value : string = 'item-'+this.getId();
}

