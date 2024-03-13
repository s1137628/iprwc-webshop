import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';
import { DataStorageService } from '../data-storage-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {

  products: Product[] = [];
  randomProduct: Product = new Product(null, "Test", "Test", 1, "Test");

  constructor(public authService: AuthService, private dataStorageService: DataStorageService, private router: Router, private route: ActivatedRoute, public productService: ProductService){

  }

  ngOnInit(){
    this.dataStorageService.getProducts().subscribe(products => {
      this.productService.setProducts(products.payload);
      this.products = this.productService.getProducts();

      const randomIndex = this.getRandomIndex(this.products.length);
      this.randomProduct = this.products[randomIndex];
    });

  }

  toAdminPanel(){
    this.router.navigate(['admin'], {relativeTo: this.route});
  }

  toUserPanel(){
    this.router.navigate(['user'], {relativeTo: this.route});
  }

  toProductPage(){
    this.router.navigate(['products'])
  }

  getRandomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
