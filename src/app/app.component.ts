import { Component,HostListener, OnInit,Inject ,ChangeDetectionStrategy} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @HostListener("window:beforeunload",["$event"])
  clearLocalStorage(event){
      localStorage.clear();
  }
}
