import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Order } from './order.model';
import { DataStorageService } from '../data-storage-service';
import { CartService } from '../cart-list/cart.service';
import { OrderService } from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.less'
})
export class OrderComponent {

  
  role: String;
  userId: String;
  totalPrice: number;
  private order: Order;
  orders: Order[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private orderService: OrderService, private authService: AuthService, private dataStorageService: DataStorageService, private cartService: CartService) {}

  ngOnInit() {
    this.totalPrice = this.cartService.getTotalPrice();
    this.authService.getRole().subscribe(() => {
      this.role = this.authService.getUserRole();
      this.userId = this.authService.getId();
      
      
    });
    this.dataStorageService.getOrders().subscribe(orders => {
      this.orderService.setOrders(orders.payload);
      this.orders = this.orderService.getOrders();
        });



  }

  confirmOrder(){
    const userId = this.authService.getId();
    const order = new Order(null, userId, this.totalPrice);
    this.dataStorageService.postOrder(order);
    sessionStorage.removeItem('products');
    this.router.navigate(['']);
    

  }

  removeOrder(order: Order) {
    this.orderService.deleteOrder(order).subscribe(
      () => {
        this.orders = this.orders.filter((o) => o.orderId !== order.orderId);
      },
      (error) => {
        console.error('Error deleting order:', error);
      }
    );

  }
}
