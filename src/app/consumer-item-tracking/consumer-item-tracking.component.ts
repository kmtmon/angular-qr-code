import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection }
  from 'angularfire2/firestore';
import { Log } from '../models/log';
import { LogService } from '../services/log.service';
import { CategoryService } from '../services/category.service';
import { CreateItems } from '../services/createItems';
import { DatePipe } from '@angular/common';
import { CreateLog } from '../services/createLog';

@Component({
  selector: 'app-consumer-item-tracking',
  templateUrl: './consumer-item-tracking.component.html',
  styleUrls: ['./consumer-item-tracking.component.css']
})
export class ConsumerItemTrackingComponent implements OnInit {

  trackingForm: FormGroup;
  loading = false;
  submitted = false;
  displayMap = false;
  logs: Log[] = [];

  title: string = 'My first AGM project';
  lat: number;
  lng: number;

  status: string;

  constructor(

    private formBuilder: FormBuilder,
    private afs: AngularFirestore,
  ) { }

  // convenience getter for easy access to form fields
  get f() { return this.trackingForm.controls; }

  ngOnInit() {
    this.trackingForm = this.formBuilder.group({
      itemId: ['', Validators.required]
    });
  }

  onTrack() {

    this.status = ""
    this.displayMap = false
    

    let deliveryDoc = this.afs.firestore.collection(`item`).doc(this.f.itemId.value)
    deliveryDoc.get().then((doc) => {
      if(doc.get('status')!== null && doc.get('status')!==''){
        
        if(doc.get('status') !== undefined){
          this.status = "Status: "+doc.get('status')
        }else{
          this.status = "Invalid Tracking Number"
        }
        

        if(doc.get('status') === 'Out for delivery'){
          this.displayOnMap()
        }
      }
    })
  }

  displayOnMap(){
    let logDoc = this.afs.firestore.collection(`log`)
      .orderBy('timestamp', "desc")

    logDoc.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

        if (doc.get('itemId') === this.f.itemId.value) {
          // console.log('id ', doc.id)
          // console.log('remark', doc.get('remark'))

          if (doc.get('remark') !== null && doc.get('remark') !== '') {

            let deliveryDoc = this.afs.firestore.collection(`delivery`).doc(doc.get('remark'))
            deliveryDoc.get().then((doc) => {
              this.displayMap = true
              this.lat = doc.get('lat')
              this.lng = doc.get('lng')
            })
          }
        }
      })
    })
  }
}
