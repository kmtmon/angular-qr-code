import { Component, OnInit,Input } from '@angular/core';
import {Item} from '../models/item';
import { ActivatedRoute, Router } from '@angular/router';
import {ItemListService} from '../services/itemList.service';
import { MessageService } from '../services/message.service'; 
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  @Input() item: Item;
  items:Item[];
  constructor(private messageService: MessageService,
    private itemListService: ItemListService,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private editrouter: Router
  ) { }

  ngOnInit() {
    this.getItems();
  }
  getItems(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.itemListService. getItems(id)
    .subscribe(items => this.items = items);
  }

}

