import { Component, OnInit ,Inject} from '@angular/core';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.css'],
  providers:[
    { provide: 'Window', useValue:window}
  ]
})
export class GenerateReportComponent implements OnInit {

  constructor(@Inject('Window') private window: Window) { }

  ngOnInit() {}

  download() {
    var doc = new jsPDF();
    doc.text(20, 20, 'Hello world!');
    doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    doc.addPage();
    doc.text(20, 20, 'dfdfd');
    doc.save('Test.pdf');
  }
}
