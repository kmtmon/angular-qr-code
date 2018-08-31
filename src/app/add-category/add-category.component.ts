import { Component, OnInit,ViewChild,Inject  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import {MessageService}  from '../services/message.service';
import { Category } from '../models/category';
import { isDefined } from '@angular/compiler/src/util';
import {CreateCategory} from '../services/createCategory';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  public csvRecords: Category[]=[];
  @ViewChild('fileImportInput') fileImportInput: any;

  constructor(   
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private location: Location,
    private createCat:CreateCategory,
    private messageService: MessageService,
    private afs: AngularFirestore,
    public dialog: MatDialog
  ) { }


  ngOnInit() {
  }
  isCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }
  getHeaderArray(csvRecordsArr: any) {
    let headers = csvRecordsArr[0].split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let dataArr : Category[]=[];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let data = csvRecordsArray[i].split('||');
       if(isDefined(data[0]) && isDefined(data[1])){
        let cat: Category= new Category("",data[0],data[1],"");
        dataArr.push(cat);
       }
    }
    return dataArr;
  }

  fileChangeListener($event: any): void {

    var text = [];
    var files = $event.srcElement.files;
    if (this.isCSVFile(files[0])) {
      var input = $event.target;
      var reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = (data) => {
        let csvData = reader.result;
        let csvRecordsArray = csvData.split("\n");
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.csvRecords = this.getDataArrayFromCSVFile(csvRecordsArray, headersRow.length);
        
      }
      reader.onerror = function() {
        alert('Unable to read ' + input.files[0]);
      };
    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = "";
    this.csvRecords =[];
  }

  submit(){
    if(this.csvRecords.length ==0){
      alert('No valid record in imported file!');
      this.fileReset();
    }else{
      
        let ifok:boolean;
        const dialogRef = this.dialog.open(CatAddConfirmDialog, {
          width: '250px',data:"Are you sure to add new product?"
        });
       
        dialogRef.afterClosed().subscribe(()=> {
          ifok=dialogRef.componentInstance.ifOk;
          if(ifok){
            for(let i=0;i< this.csvRecords.length;i++){
              this.afs.collection('product').add({'name': this.csvRecords[i].name, 'desc': this.csvRecords[i].description});
              let catDoc = this.afs.firestore.collection(`product`);
              catDoc.get().then((querySnapshot) => { 
                querySnapshot.forEach((doc) => {
                  if(doc.get('name')==this.csvRecords[i].name && doc.get('desc')==this.csvRecords[i].description){
                    this.createCat.addToCatList(doc.id,this.csvRecords[i].name,this.csvRecords[i].description,"");
                  }
                })
              }) 
             
             // this.createCat.addToCatList("",this.csvRecords[i].name,this.csvRecords[i].description,"");
            }
            alert('Products successfully added!');
            this.goBack();
          }
          if(!ifok){
            this.fileReset();
          }
        });
      }
  }


  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'confirm_dialog',
  templateUrl: 'confirm_dialog.html',
})
export class CatAddConfirmDialog {
  
  ifOk:boolean;
  constructor(
    public dialogRef: MatDialogRef<CatAddConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  okClick(): void {
    this.dialogRef.close();
    this.ifOk=true;
  }
  cancel():void{
    this.dialogRef.close();
    this.ifOk=false;
  }
}