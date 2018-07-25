import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import {MessageService}  from '../services/message.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  addItemForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  constructor(   
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private location: Location,
    private messageService: MessageService) { }


  ngOnInit() {
    this.addItemForm = this.formBuilder.group({
        catName: ['', Validators.required],
        location: ['', Validators.required]
    });
  }

// convenience getter for easy access to form fields
get f() { return this.addItemForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addItemForm.invalid) {
        return;
    }
    this.loading = true;
  }
  goBack(): void {
    this.location.back();
  }
}