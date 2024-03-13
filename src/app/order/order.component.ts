import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Order } from './order.model';
import { DataStorageService } from '../data-storage-service';
import { CartService } from '../cart-list/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.less'
})
export class OrderComponent {

  totalPrice: number;
  order: Order;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService, private dataStorageService: DataStorageService, private cartService: CartService) {}

  ngOnInit() {
    this.totalPrice = this.cartService.getTotalPrice();
  }

  confirmOrder(){
    const userId = this.authService.getId();
    const order = new Order(null, userId, this.totalPrice);
    this.dataStorageService.postOrder(order);
    sessionStorage.removeItem('products');
    this.router.navigate(['']);
    

  }
  
}
