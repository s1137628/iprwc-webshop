import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';
import { DataStorageService } from '../../data-storage-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.less'
})
export class ProductListComponent {
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
