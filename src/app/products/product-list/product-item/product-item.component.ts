import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';
import { AuthService } from '../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductEditPopupComponent } from '../../product-edit-popup/product-edit-popup.component';
import { NotificationService } from '../../../notifications/notification.service';
import { Notification } from '../../../notifications/notification.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.less'
})
export class ProductItemComponent {
  @Input() product: Product;
  @Output() buy = new EventEmitter<Product>;
  role: String;


  constructor(private productService: ProductService, public authService: AuthService, private dialog: MatDialog, private notificationService: NotificationService){}

  ngOnInit(){
    this.role = this.authService.getUserRole()
  }

  addToCart(){
    this.productService.addProductToCart(this.product)
      
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
