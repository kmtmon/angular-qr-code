import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerItemTrackingComponent } from './consumer-item-tracking.component';

describe('ConsumerItemTrackingComponent', () => {
  let component: ConsumerItemTrackingComponent;
  let fixture: ComponentFixture<ConsumerItemTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumerItemTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerItemTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
