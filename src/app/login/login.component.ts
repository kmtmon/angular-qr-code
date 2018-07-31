import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import {MessageService}  from '../services/message.service';
import {CreateUsers} from '../services/createUsers';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import {CreateCategory} from '../services/createCategory';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private messageService: MessageService,
      private createUsers:CreateUsers,
      private afs: AngularFirestore,
      private createCat:CreateCategory,
    ) {}

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
      let userDoc = this.afs.firestore.collection(`user`);
      userDoc.get().then((querySnapshot) => { 
          querySnapshot.forEach((doc) => {
              this.createUsers.addToUseList(doc.id,doc.get('email'),doc.get('password'));
          })
      })      
       
      let catDoc = this.afs.firestore.collection(`product`);
      catDoc.get().then((querySnapshot) => { 
        querySnapshot.forEach((doc) => {
            this.createCat.addToCatList(doc.id,doc.get('name'),doc.get('desc'));
        })
    })    
            
      // reset login status
      this.authenticationService.logout();

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true; 
      this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}
