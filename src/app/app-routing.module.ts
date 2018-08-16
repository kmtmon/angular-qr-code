import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import {HomeComponent} from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryDetailsEditComponent } from './category-details-edit/category-details-edit.component';
import { CategoryDetailsComponent} from './category-details/category-details.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { LogComponent } from './log/log.component';
import {AddCategoryComponent} from './add-category/add-category.component';
import {AddItemComponent} from './add-item/add-item.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {GenerateReportComponent} from './generate-report/generate-report.component';
import {ConsumerItemTrackingComponent} from './consumer-item-tracking/consumer-item-tracking.component';
const routes: Routes = [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'catDetailEdit/:id', component: CategoryDetailsEditComponent },
    { path: 'catDetail/:id', component: CategoryDetailsComponent },
    { path: 'itemEdit/:id', component: ItemEditComponent },
    { path: 'log/:id', component: LogComponent },
    { path: 'addCategory', component: AddCategoryComponent },
    { path: 'addItem', component: AddItemComponent },
    { path: 'itemDetails/:id',  component:ItemDetailsComponent},
    { path: 'generateReport', component:GenerateReportComponent},
    { path: 'consumerItemTracking', component:ConsumerItemTrackingComponent},
    // otherwise redirect to home
   // { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule],
  declarations: []
})
export class AppRoutingModule { }

