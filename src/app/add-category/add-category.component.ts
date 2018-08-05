import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { AlertService } from '../services/alert.service';
import {MessageService}  from '../services/message.service';
import { Category } from '../models/category';
import { isDefined } from '@angular/compiler/src/util';
import { AngularFirestore, AngularFirestoreCollection } 
from 'angularfire2/firestore';

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
    private messageService: MessageService,
    private afs: AngularFirestore,
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
        let cat: Category= new Category("",data[0],data[1]);
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
    console.log("record len "+this.csvRecords.length);
    for(let i=0;i< this.csvRecords.length;i++){
      console.log( "record name: "+this.csvRecords[i].name+" record desc: "+this.csvRecords[i].description);
      this.afs.collection('product').add({'name': this.csvRecords[i].name, 'desc': this.csvRecords[i].description});
    }
    if(this.csvRecords.length ==0){
      alert('No valid record in imported file!');
    }else{
      alert('Products successfully added!');
      this.goBack();
    }
  }
  goBack(): void {
    this.location.back();
  }
}
