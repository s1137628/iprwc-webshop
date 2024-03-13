import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditPopupComponent } from './product-edit-popup.component';

describe('ProductEditPopupComponent', () => {
  let component: ProductEditPopupComponent;
  let fixture: ComponentFixture<ProductEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductEditPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
