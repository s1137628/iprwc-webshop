import { Component } from '@angular/core';
import { Order } from '../order/order.model';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../data-storage-service';
import { CartService } from '../cart-list/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order/order.service';
import { User } from '../auth/user.model';
import { UserService } from '../auth/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.less'
})
export class UserComponent {

  totalPrice: number;
  emptyState: boolean;
  role: String;
  email: String;
  orderId: String;
  userId: String;
  orders: Order[] = [];
  

  constructor(public authService: AuthService, private dataStorageService: DataStorageService, private userService: UserService, private orderService: OrderService, private cartService: CartService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.totalPrice = this.cartService.getTotalPrice();
    this.authService.getRole().subscribe(() => {
      this.role = this.authService.getUserRole();
      this.email = this.authService.getEmail();
      this.userId = this.authService.getId();
      
    });
    this.dataStorageService.getOrders().subscribe(orders => {
      this.orderService.setOrders(orders.payload);
      this.orders = this.orderService.getOrders();
      this.orders = this.orderService.getOrders().filter(order => order.userId === this.userId);
      
        });


  }

  toAdminPanel(){
    this.router.navigate(['/admin']);
  }

  toOrdersOverview(){
    this.router.navigate(['/order']);
  }
  
}
