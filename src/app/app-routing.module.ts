import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products/products.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import { OrderComponent } from './order/order.component';
import { AdminGuard } from './auth/admin.guard';
import { OrderGuard } from './auth/order.guard';
import { UserComponent } from './user/user.component';
import { UserGuard } from './auth/user.guard';
import { ProductListAdminComponent } from './admin/product-list-admin/product-list-admin.component';

const routes: Routes = [  { path: '', component: HomeComponent },
{ path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
    { path: 'products', component: ProductListAdminComponent }]},
  { path: 'order', component: OrderComponent, canActivate: [OrderGuard]},
  { path: 'user', component: UserComponent, canActivate: [UserGuard]}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
