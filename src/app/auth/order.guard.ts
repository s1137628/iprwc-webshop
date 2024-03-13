import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CartService } from '../cart-list/cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderGuard implements CanActivate {
  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.authService.isLoggedIn() && this.cartService.containsItems()) {
      return true;
    } else {
      this.router.navigate(['products']);
      return false;
    }
  }
}
