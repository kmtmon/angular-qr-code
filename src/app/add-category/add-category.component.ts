import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import {MessageService}  from '../services/message.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  addCatForm: FormGroup;
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
    this.addCatForm = this.formBuilder.group({
        catName: ['', Validators.required],
        description: ['', Validators.required]
    });
  }

// convenience getter for easy access to form fields
get f() { return this.addCatForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addCatForm.invalid) {
        return;
    }
    this.loading = true;
  }
  goBack(): void {
    this.location.back();
  }
}
