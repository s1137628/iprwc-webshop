import { Component } from '@angular/core';
import { Order } from '../order/order.model';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../data-storage-service';
import { CartService } from '../cart-list/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  orderId: any;

  constructor(public authService: AuthService, private dataStorageService: DataStorageService, private cartService: CartService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.totalPrice = this.cartService.getTotalPrice();
    this.authService.getRole().subscribe(() => {
      this.role = this.authService.getUserRole();
      this.email = this.authService.getEmail();
    });
  }

  toAdminPanel(){
    this.router.navigate(['/admin']);

  }
  
}
