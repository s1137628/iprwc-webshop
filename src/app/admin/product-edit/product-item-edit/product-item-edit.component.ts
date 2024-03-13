import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../products/product.model';
import { ProductService } from '../../../products/product.service';
import { AuthService } from '../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditPopupComponent } from '../../../products/product-edit-popup/product-edit-popup.component';

@Component({
  selector: 'app-product-item-edit',
  templateUrl: './product-item-edit.component.html',
  styleUrl: './product-item-edit.component.less'
})
export class ProductItemEditComponent {
  @Input() product: Product;
  @Output() buy = new EventEmitter<Product>;
  role: String;


  constructor(private productService: ProductService, public authService: AuthService, private dialog: MatDialog){}

  ngOnInit(){
    this.role = this.authService.getUserRole()
  }

  openEditPopup(): void {
    const dialogRef = this.dialog.open(ProductEditPopupComponent, {
      data: this.product,
    });

    dialogRef.afterClosed().subscribe((editedProduct: Product) => {
      if (editedProduct) {
        this.productService.editProduct(editedProduct);
      }
    });
  }

  removeProduct(){
    console.log("REMOVED");
     this.productService.deleteProduct(this.product).subscribe(() => {
    });
    }

}
