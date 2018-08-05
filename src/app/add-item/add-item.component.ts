import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import {MessageService}  from '../services/message.service';
import { isDefined } from '@angular/compiler/src/util';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import { Item } from '../models/item';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  public csvRecords: Item[]=[];
  @ViewChild('fileImportInput') fileImportInput: any;
  constructor(   
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private location: Location,
    private messageService: MessageService,
    private afs: AngularFirestore,
  ) { }


  ngOnInit() {
   
  }
 
  goBack(): void {
    this.location.back();
  }
}