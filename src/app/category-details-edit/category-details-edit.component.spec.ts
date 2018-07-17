import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDetailsEditComponent } from './category-details-edit.component';

describe('CategoryDetailsEditComponent', () => {
  let component: CategoryDetailsEditComponent;
  let fixture: ComponentFixture<CategoryDetailsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDetailsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
