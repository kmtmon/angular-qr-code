import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../services/category.service';
import {Category } from '../models/category';
import { MessageService } from '../services/message.service'; 
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import {CreateCategory} from '../services/createCategory';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {
  @Input() category: Category;
  constructor(private route: ActivatedRoute,
    private catService: CategoryService,
    private location: Location,
    private messageService: MessageService,
    private editrouter: Router,
    private afs: AngularFirestore,
    private createCat:CreateCategory
  ) { }

  ngOnInit() {
    this.getCat();
  }

  getCat(): void {
    let catDoc = this.afs.firestore.collection(`product`);
   
    if(this.createCat.cats.length == 0){
      catDoc.get().then((querySnapshot) => { 
        let tempcats:Category[]=[];
          querySnapshot.forEach((doc) => {
              let tempcat = new Category(doc.id,doc.get('name'),doc.get('desc'),doc.get('imagePath'));
              tempcats.push(tempcat);
          })
          const id = this.route.snapshot.paramMap.get('id');
          this.category =tempcats.find(cat => cat.id === id);
      })   
     
    }else{
      const id = this.route.snapshot.paramMap.get('id');
      this.category=this.catService.getCat(id);
    }
  }

  getId() : string{
    const id = this.route.snapshot.paramMap.get('id');
    return id;
  }
  goBack(): void {
    this.location.back();
  }

  editCategory() {
    this.editrouter.navigateByUrl('/catDetailEdit/'+this.category.id);

  }
  
}
