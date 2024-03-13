import { Component } from '@angular/core';
import { Product } from '../products/product.model';
import { ProductService } from '../products/product.service';
import { CartService } from './cart.service';
import { AuthService } from '../auth/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.less'
})
export class CartListComponent {
  cart: Product[];

  constructor(private productService: ProductService, private cartService: CartService, private authService: AuthService, private router: Router ) {}

  ngOnInit(){
    this.cart = JSON.parse(sessionStorage.getItem('products'));
  }

  emptyCart(){
    this.cartService.emptyCart();
    this.cart = [];
    sessionStorage.removeItem('products'); 
   }

  popElementInCart(index: number){
    this.cartService.deleteByNumberCart(index);
    if (index > -1) {
      this.cart.splice(index, 1);
  }
}

  getTotalPrice(): number{
    return this.cart.reduce((total, item) => total + item.price, 0)
  }

  orderProducts(){
    if(this.authService.isLoggedIn() && this.cartService.containsItems()){
      const totalPrice = this.getTotalPrice();
      this.cartService.setTotalPrice(totalPrice);
      this.router.navigate(['../order'])
    }
    else{
      this.router.navigate(['/auth']);
    }
  }

}
