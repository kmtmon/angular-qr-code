import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import {HomeComponent} from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryDetailsEditComponent } from './category-details-edit/category-details-edit.component';
import { CategoryDetailsComponent} from './category-details/category-details.component';
const routes: Routes = [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'catDetailEdit/:id', component: CategoryDetailsEditComponent },
    { path: 'catDetail/:id', component: CategoryDetailsComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppRoutingModule { }

