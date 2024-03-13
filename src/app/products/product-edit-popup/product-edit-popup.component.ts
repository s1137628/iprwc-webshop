// product-edit-popup.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import form-related modules
import { Product } from '../product.model';

@Component({
  selector: 'app-product-edit-popup',
  templateUrl: './product-edit-popup.component.html',
})
export class ProductEditPopupComponent {
  productForm: FormGroup; // Form group for product data

  constructor(
    public dialogRef: MatDialogRef<ProductEditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private fb: FormBuilder // Inject FormBuilder
  ) {
    this.createForm();
  }

  createForm(): void {
    this.productForm = this.fb.group({
      name: [this.product.name, Validators.required],
      description: [this.product.description, Validators.required],
      price: [this.product.price, [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      imagePath: [this.product.imagePath, Validators.required]
    });
  }

  onSaveClick(): void {
    if (this.productForm.valid) {
      const editedProduct: Product = {
        ...this.product,
        ...this.productForm.value,
      };
      this.dialogRef.close(editedProduct);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
