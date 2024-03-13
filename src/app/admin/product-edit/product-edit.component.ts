import { Component } from '@angular/core';
import { Product } from '../../products/product.model';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../data-storage-service';
import { ProductService } from '../../products/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.less'
})
export class ProductEditComponent {

  products: Product[];
  role: String;

  constructor(public authService: AuthService, private dataStorageService: DataStorageService, private productService: ProductService, private router: Router,
    private route: ActivatedRoute){}

  ngOnInit() {
    this.dataStorageService.getProducts().subscribe(products => {
      this.productService.setProducts(products.payload);
      this.products = this.productService.getProducts();
    });
    
}
}
