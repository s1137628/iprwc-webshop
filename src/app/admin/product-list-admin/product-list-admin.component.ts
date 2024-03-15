import { Component } from '@angular/core';
import { Product } from '../../products/product.model';
import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../data-storage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../products/product.service';

@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrl: './product-list-admin.component.less'
})
export class ProductListAdminComponent {
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
