import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../products/product.model';
import { ProductService } from '../../../products/product.service';
import { AuthService } from '../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditPopupComponent } from '../../../products/product-edit-popup/product-edit-popup.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrl: './products-admin.component.less'
})
export class ProductsAdminComponent {

  @Input() product: Product;
  @Output() buy = new EventEmitter<Product>;
  role: String;


  constructor(private productService: ProductService, public authService: AuthService, private dialog: MatDialog, private router: Router, private route: ActivatedRoute){}

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
      this.product = editedProduct;
    });
  }

  removeProduct() {
    this.productService.deleteProduct(this.product).subscribe(
      () => {
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  
}
