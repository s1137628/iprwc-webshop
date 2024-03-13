import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItemEditComponent } from './product-item-edit.component';

describe('ProductItemEditComponent', () => {
  let component: ProductItemEditComponent;
  let fixture: ComponentFixture<ProductItemEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductItemEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
