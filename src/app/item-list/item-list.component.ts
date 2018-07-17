import { Component, OnInit } from '@angular/core';
import {Item} from '../models/item';
import {ItemService} from '../services/item.service';
import { MessageService } from '../services/message.service'; 

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  }

}
