import { Component, OnInit, Input, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { MessageService } from '../services/message.service';
import { CreateCategory } from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { isDefined } from '@angular/compiler/src/util';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-details-edit',
  templateUrl: './category-details-edit.component.html',
  styleUrls: ['./category-details-edit.component.css']
})
export class CategoryDetailsEditComponent implements OnInit {

  imagePath: string = "";

  @Input() orgCat: Category;
  id: string;
  messages: string = "";
  catName: string;
  catDesc: string;
  constructor(
    private route: ActivatedRoute,
    private catService: CategoryService,
    private location: Location,
    private messageService: MessageService,
    private createCat: CreateCategory,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getOrgCatInfo();
  }

  upload(event) {
    const file = event.target.files[0];
    const filePath = '/product/' + this.id;
    const fileRef = this.afStorage.ref(filePath);
    const task = this.afStorage.upload(filePath, file);

    // observe percentage changes
    const uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
      finalize(() => {
        const downloadURL = fileRef.getDownloadURL()
        downloadURL.subscribe(url=>{this.imagePath = url})})
    )
      .subscribe()
  }

  getOrgCatInfo(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.orgCat = this.catService.getCat(this.id);
    this.catName = this.orgCat.name;
    this.catDesc = this.orgCat.description;
    this.imagePath = this.orgCat.imagePath;
  }

  goBack(): void {
    this.location.back();
  }

  updateTodo(cat: Category) {
    
    let todoCollectionRef = this.afs.collection<Category>('product');
    todoCollectionRef.doc(cat.id).update(
      { desc: this.catDesc, name: this.catName, imagePath: this.imagePath });
  }

  saveChange():void{
    let matchedIndex:number;
    let ifok:boolean;
    if(this.catName!="" && this.catName!=" " && this.catDesc!="" &&  this.catDesc!=" "){
      this.messages="";
    }
    for(let i=0;i<this.createCat.cats.length;i++){
      if(this.createCat.cats[i].id == this.orgCat.id){
        if(this.catName=="" ||this.catName==" "){
          this.messages +="Product name is a required field!\n";
        }if(this.catDesc=="" || this.catDesc==" "){
          this.messages+="Description is a required field!\n";
        }if(this.messages==""){
          matchedIndex=i;

        }
      }
    }
    if (this.messages == "") {
      const dialogRef = this.dialog.open(CatConfirmDialog, {
        width: '250px', data:"Are you sure to update product?"
      });
      dialogRef.afterClosed().subscribe(()=> {
        ifok=dialogRef.componentInstance.ifOk;
        console.log("ifok "+ifok);
        if(ifok){
          this.updateTodo(this.createCat.cats[matchedIndex]);
          this.createCat.cats[matchedIndex].name=this.catName;
          this.createCat.cats[matchedIndex].description=this.catDesc;
          this.createCat.cats[matchedIndex].imagePath=this.imagePath;
          this.goBack();
        }
      });
    }else{
      alert(this.messages);
     
    }
  }
}


@Component({
  selector: 'confirm_dialog',
  templateUrl: 'confirm_dialog.html',
})
export class CatConfirmDialog {
  
  ifOk:boolean;
  constructor(
    public dialogRef: MatDialogRef<CatConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  okClick(): void {
    this.dialogRef.close();
    this.ifOk=true;
  }
  cancel():void{
    this.dialogRef.close();
    this.ifOk=false;
  }
}
