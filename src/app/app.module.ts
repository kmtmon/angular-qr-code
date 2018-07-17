import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule,HTTP_INTERCEPTORS }    from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AlertComponent } from './alert/alert.component';
import {AlertService} from './services/alert.service';
import {AuthenticationService} from './services/authentication.service';
import {UserService} from './services/user.service';
import { AuthGuard } from './services/auth.guard';
import { fakeBackendProvider } from './fake-backend';
import { JwtInterceptor } from './jwt.interceptor';
import {  ErrorInterceptor } from './error.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentUserComponent } from './current-user/current-user.component';
import { ItemListComponent } from './item-list/item-list.component';
import { CategoryDetailsEditComponent } from './category-details-edit/category-details-edit.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MessagesComponent,
    AlertComponent,
    DashboardComponent,
    CurrentUserComponent,
    ItemListComponent,
    CategoryDetailsEditComponent,
    CategoryDetailsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: 
    [AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
